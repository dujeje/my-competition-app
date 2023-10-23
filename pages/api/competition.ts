import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateRoundRobin } from '../../utilis/scheduleGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();

        try {
            const session = await getSession(req, res);

            if (!session || !session.user.email) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { competitionName, competitors, scoringSystem } = req.body;

            if (
                typeof competitionName !== 'string' ||
                competitors.length < 4 ||
                competitors.length > 8 ||
                !scoringSystem.match(/^\d+\/\d+\/\d+$/)
            ) {
                return res.status(400).json({ error: 'Invalid input' });
            }

            const userEmail = session.user.email;

            const competition = await prisma.competition.create({
                data: {
                    name: competitionName,
                    participants: competitors,
                    scoring: scoringSystem,
                    createdBy: {
                        connect: {
                            email: userEmail,
                        },
                    },
                },
            });

            const teams = competitors;
            if (teams.length % 2 !== 0) {
                teams.push('BYE');
            }
            const scheduleData = generateRoundRobin(teams);

            const schedule = await prisma.schedule.create({
                data: {
                    competitionId: competition.id,
                    scheduleData,
                },
            });

            res.status(201).json({ message: 'Competition created successfully', competition, schedule });
        } catch (error) {
            console.error('Error creating competition:', error);
            res.status(500).json({ error: 'Failed to create competition' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
