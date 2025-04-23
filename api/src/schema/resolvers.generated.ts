/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { AuthPayload } from './user/resolvers/AuthPayload';
import    { createSession as Mutation_createSession } from './session/resolvers/Mutation/createSession';
import    { markFeatured as Mutation_markFeatured } from './speaker/resolvers/Mutation/markFeatured';
import    { signIn as Mutation_signIn } from './user/resolvers/Mutation/signIn';
import    { signOut as Mutation_signOut } from './user/resolvers/Mutation/signOut';
import    { signUp as Mutation_signUp } from './user/resolvers/Mutation/signUp';
import    { toggleFavoriteSession as Mutation_toggleFavoriteSession } from './user/resolvers/Mutation/toggleFavoriteSession';
import    { userInfo as Mutation_userInfo } from './user/resolvers/Mutation/userInfo';
import    { me as Query_me } from './user/resolvers/Query/me';
import    { sessionById as Query_sessionById } from './session/resolvers/Query/sessionById';
import    { sessions as Query_sessions } from './session/resolvers/Query/sessions';
import    { speakerById as Query_speakerById } from './speaker/resolvers/Query/speakerById';
import    { speakers as Query_speakers } from './speaker/resolvers/Query/speakers';
import    { userById as Query_userById } from './user/resolvers/Query/userById';
import    { users as Query_users } from './user/resolvers/Query/users';
import    { Session } from './session/resolvers/Session';
import    { SignOutPayload } from './user/resolvers/SignOutPayload';
import    { Speaker } from './speaker/resolvers/Speaker';
import    { User } from './user/resolvers/User';
import    { UserInfoPayload } from './user/resolvers/UserInfoPayload';
    export const resolvers: Resolvers = {
      Query: { me: Query_me,sessionById: Query_sessionById,sessions: Query_sessions,speakerById: Query_speakerById,speakers: Query_speakers,userById: Query_userById,users: Query_users },
      Mutation: { createSession: Mutation_createSession,markFeatured: Mutation_markFeatured,signIn: Mutation_signIn,signOut: Mutation_signOut,signUp: Mutation_signUp,toggleFavoriteSession: Mutation_toggleFavoriteSession,userInfo: Mutation_userInfo },
      
      AuthPayload: AuthPayload,
Session: Session,
SignOutPayload: SignOutPayload,
Speaker: Speaker,
User: User,
UserInfoPayload: UserInfoPayload
    }