const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();

    try {
        // Create a User
        const user = await prisma.user.create({
            data: {
                email: 'user@example.com', // Replace with the desired email
            },
        });

        // Insert test data into your database here
        const competition = await prisma.competition.create({
            data: {
                name: 'Sample Competition',
                participants: ['Participant A', 'Participant B', 'Participant C'],
                scoring: '3/1/0',
                createdBy: {
                    connect: {
                        id: user.id, // Use the created user's id
                    },
                },
            },
        });

        console.log('User created:', user);
        console.log('Competition created:', competition);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    throw error;
});
