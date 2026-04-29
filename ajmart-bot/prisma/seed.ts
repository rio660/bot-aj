import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
await prisma.adminUser.upsert({ where:{phone:'6280000000000'}, update:{}, create:{ name:'AJ', phone:'6280000000000', passwordHash:'change-me', role:'owner' } });
await prisma.botSetting.upsert({ where:{key:'prefix'}, update:{value:'.'}, create:{key:'prefix', value:'.'} });
console.log('seed done');
await prisma.$disconnect();
