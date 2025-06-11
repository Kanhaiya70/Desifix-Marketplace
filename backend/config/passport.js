import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config({ path: path.resolve(_dirname, '../.env')});

passport.use(
  new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/oauth/google/callback`
  },
  async(accessToken, refreshToken, profile, done) => {
    try{
      let user = await User.findOne({ email: profile.emails[0].value});
      if(!user){
        user = await User.create({
          name: profile.displayname,
          email: profile.emails[0].value,
          password: 'oauth_placeholder',
          role: 'user'
          });
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
        return done(null, user);
    } catch (err){
      return done(err, null);
    }
  })
)