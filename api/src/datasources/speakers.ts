import { Low } from 'lowdb/lib';
import { JSONPreset } from 'lowdb/node';

type Speaker = {
  id: string;
  userId: string;
  name: string;
};

type Data = { speakers: Speaker[] };

const defaultData: Data = {
  speakers: [],
};

export class SpeakersDataSource {
  private speakers: Speaker[];
  private db: Low<Data>;

  constructor(db: Low<Data>) {
    const { speakers } = db.data;
    this.speakers = speakers;
    this.db = db;
  }

  public static async create() {
    const db = await JSONPreset<Data>('./data/speakers.json', defaultData);
    return new SpeakersDataSource(db);
  }

  getSpeakers(args?: { featured?: boolean }) {
    return this.speakers;
  }

  getSpeakerById(id: string) {
    const speaker = this.speakers.find((speaker) => speaker.id === id);

    if (!speaker) {
      throw new Error(`Could not find speaker with id ${id}`);
    }

    return speaker;
  }

  getSpeakerByUserId(userId: string) {
    return this.speakers.find((speaker) => speaker.userId === userId);
  }

  async createSpeaker(user: { id: string; name: string }) {
    const newSpeaker = {
      userId: user.id,
      id: String(this.speakers.length + 1),
      name: user.name,
    };
    this.speakers.push(newSpeaker);
    await this.db.write();
    return newSpeaker;
  }

  async markFeatured(speakerId: string, featured: boolean) {
    const speaker = this.speakers.find((s) => s.id === speakerId);
    if (speaker) {
      await this.db.write();
    }
    return speaker;
  }
}
