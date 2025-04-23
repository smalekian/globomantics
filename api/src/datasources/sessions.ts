import { Low } from 'lowdb/lib';
import { JSONPreset } from 'lowdb/node';
import { Session, SessionInput, User } from '../schema/types.generated';

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type EndsAt = string;

export type Format = 'FullDay Workshop' | 'HalfDay Workshop' | 'Session' | 'Lecture';

export type ID = number;

export type Level = 'Intermediate' | 'Advanced' | 'Introductory and Overview' | 'Beginner';

const tracks = [
  '.NET',
  'DevOps',
  'Data',
  'Cloud',
  'JavaScript',
  'Other Languages',
  'Process',
  'Human Skills',
  'Java',
  'UI/UX',
  'Data Science',
  'Mobile',
  'Testing/QA',
  'AR/VR',
  'PHP',
] as const;

const tracksWithColors = [
  { name: '.NET', color: '#ffbeba' },
  { name: 'DevOps', color: '#ffdcaa' },
  { name: 'Data', color: '#ffeeaa' },
  { name: 'Cloud', color: '#cdf2cb' },
  { name: 'JavaScript', color: '#c8edfd' },
  { name: 'Other Languages', color: '#aad3ff' },
  { name: 'Process', color: '#c7c7f1' },
  { name: 'Human Skills', color: '#ffb9c6' },
  { name: 'Java', color: '#8445ac' },
  { name: 'UI/UX', color: '#c1f138' },
  { name: 'Data Science', color: '#fb292f' },
  { name: 'Mobile', color: '#e55221' },
  { name: 'Testing/QA', color: '#897dcb' },
  { name: 'AR/VR', color: '#0e97f0' },
  { name: 'PHP', color: '#71a629' },
] as const;

export type Track = (typeof tracksWithColors)[number];

export type Speaker = {
  id: string;
  name?: string;
};

export type StartsAt = string;

type Data = { sessions: Session[] };

const defaultData: Data = {
  sessions: [],
};

export class SessionsDataSource {
  private sessions: Session[];
  private db: Low<Data>;

  constructor(db: Low<Data>) {
    const { sessions } = db.data;
    this.sessions = sessions;
    this.db = db;
  }

  public static async create() {
    const db = await JSONPreset<Data>('./data/sessions.json', defaultData);
    return new SessionsDataSource(db);
  }

  getSessions(args?: { ids?: string[] }) {
    if (args?.ids && args.ids.length > 0) {
      return this.sessions.filter((session) => args.ids.includes(session.id.toString()));
    }

    return this.sessions;
  }

  getSessionById(id: string): Session {
    const session = this.sessions.find((session) => session.id.toString() === id);

    if (!session) {
      throw new Error(`Could not find session with id ${id}`);
    }

    return session;
  }

  getSessionsForSpeaker(speakerId: string) {
    return this.sessions.filter((session) => session.speakers.map((s) => s.id).includes(speakerId));
  }

  async createSession(session: SessionInput, user: User): Promise<Session> {
    if (!user) {
      throw new Error('Not authorized');
    }

    const id = this.sessions.length + 1;

    const newSession = {
      id,
      speakers: [
        {
          id: user.id,
          name: user.name,
        },
      ],
      ...session,
    };

    this.sessions.push(newSession);
    await this.db.write();
    return newSession;
  }
}
