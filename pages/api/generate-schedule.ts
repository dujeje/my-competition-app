import { PrismaClient } from '@prisma/client';
import { generateRoundRobin } from '../../utilis/scheduleGenerator';

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();

        try {
            const { competitionId } = req.body;

            const competition = await prisma.competition.findUnique({
                where: { id: competitionId },
            });

            if (!competition) {
                return res.status(404).json({ error: 'Competition not found' });
            }

            const teams = competition.participants;

            if (teams.length % 2 !== 0) {
                teams.push('BYE');
            }

            const scheduleData = generateRoundRobin(teams);

            res.status(201).json({ scheduleData });

        } catch (error) {
            console.error('Error generating schedule:', error);
            res.status(500).json({ error: 'Failed to generate schedule' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
