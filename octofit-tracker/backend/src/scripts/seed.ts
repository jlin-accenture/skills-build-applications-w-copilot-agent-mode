import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', city: 'Seattle', slogan: 'Climb Every Mile', totalPoints: 0 },
      { name: 'Pulse Crew', city: 'Austin', slogan: 'Train Loud, Recover Smart', totalPoints: 0 },
      { name: 'Metro Sprinters', city: 'Chicago', slogan: 'Faster Every Block', totalPoints: 0 },
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Chen',
        email: 'avery.chen@octofit.local',
        age: 29,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 320,
        team: teams[0]._id,
      },
      {
        name: 'Jordan Patel',
        email: 'jordan.patel@octofit.local',
        age: 34,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 240,
        team: teams[1]._id,
      },
      {
        name: 'Sofia Ramirez',
        email: 'sofia.ramirez@octofit.local',
        age: 26,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 300,
        team: teams[2]._id,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@octofit.local',
        age: 31,
        fitnessLevel: 'beginner',
        weeklyGoalMinutes: 180,
        team: teams[0]._id,
      },
      {
        name: 'Nina Kovac',
        email: 'nina.kovac@octofit.local',
        age: 37,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 210,
        team: teams[1]._id,
      },
    ]);

    await Team.updateOne(
      { _id: teams[0]._id },
      { $set: { captain: users[0]._id, members: [users[0]._id, users[3]._id], totalPoints: 1880 } }
    );
    await Team.updateOne(
      { _id: teams[1]._id },
      { $set: { captain: users[1]._id, members: [users[1]._id, users[4]._id], totalPoints: 1725 } }
    );
    await Team.updateOne(
      { _id: teams[2]._id },
      { $set: { captain: users[2]._id, members: [users[2]._id], totalPoints: 1260 } }
    );

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 610,
        distanceKm: 10.4,
        occurredAt: new Date('2026-07-20T06:40:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'cycle',
        durationMinutes: 68,
        caloriesBurned: 735,
        distanceKm: 24.1,
        occurredAt: new Date('2026-07-21T12:00:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        type: 'strength',
        durationMinutes: 45,
        caloriesBurned: 420,
        occurredAt: new Date('2026-07-21T17:15:00Z'),
      },
      {
        user: users[3]._id,
        team: teams[0]._id,
        type: 'walk',
        durationMinutes: 38,
        caloriesBurned: 210,
        distanceKm: 3.9,
        occurredAt: new Date('2026-07-22T07:20:00Z'),
      },
      {
        user: users[4]._id,
        team: teams[1]._id,
        type: 'yoga',
        durationMinutes: 34,
        caloriesBurned: 170,
        occurredAt: new Date('2026-07-22T19:10:00Z'),
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'swim',
        durationMinutes: 40,
        caloriesBurned: 460,
        occurredAt: new Date('2026-07-23T06:15:00Z'),
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Tempo 5K Builder',
        description: 'Progressive run intervals that build sustained 5K speed.',
        durationMinutes: 40,
        difficulty: 'intermediate',
        focusArea: 'Endurance',
        equipment: ['running shoes', 'watch'],
        recommendedFor: ['intermediate', 'advanced'],
        caloriesEstimate: 420,
      },
      {
        name: 'Core and Mobility Reset',
        description: 'Low-impact mobility and core sequence for active recovery.',
        durationMinutes: 25,
        difficulty: 'beginner',
        focusArea: 'Mobility',
        equipment: ['yoga mat'],
        recommendedFor: ['beginner', 'intermediate'],
        caloriesEstimate: 155,
      },
      {
        name: 'Lactate Threshold Bike Session',
        description: 'Structured bike blocks near threshold power.',
        durationMinutes: 55,
        difficulty: 'advanced',
        focusArea: 'Cycling Power',
        equipment: ['bike', 'heart rate monitor'],
        recommendedFor: ['advanced'],
        caloriesEstimate: 690,
      },
    ]);

    await Leaderboard.create({
      period: 'weekly',
      season: '2026-W30',
      entries: [
        { user: users[0]._id, points: 980, rank: 1 },
        { user: users[1]._id, points: 920, rank: 2 },
        { user: users[2]._id, points: 870, rank: 3 },
        { user: users[4]._id, points: 805, rank: 4 },
        { user: users[3]._id, points: 640, rank: 5 },
      ],
    });

    console.log(
      `Inserted ${users.length} users, ${teams.length} teams, 6 activities, 1 leaderboard, and 3 workouts`
    );
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
