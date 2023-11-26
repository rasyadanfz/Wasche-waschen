import { defineConfig } from "cypress";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('task',{
                async fetchPakaianFromDatabase(){
                    try{
                        const pakaian = await prisma.pakaian.findMany();
                        return pakaian;
                    }finally{
                        await prisma.$disconnect
                    }
                },
            });
        },
        baseUrl: "http://localhost:3000",
        viewportWidth: 1280,
        viewportHeight: 720,
        screenshotOnRunFailure: false,
    },

    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
