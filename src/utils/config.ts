/**
 * Configuration utility for environment variables
 */

interface Config {
    server: {
        ip: string;
        ports: {
            admin: number;
            analyzer: number;
            summarizer: number;
            translator: number;
            factChecker: number;
            collab: number;
            interrogator: number;
            deepChat: number;
        };
        apiPorts: {
            collab: number;
            irp: number;
        };
        routes: {
            analyzer: number;
            summarizer: number;
            translator: number;
            factChecker: number;
            deepChat: number;
            interrogator: number;
        };
    };
}

export const config: Config = {
    server: {
        ip: process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS || 'localhost',
        ports: {
            admin: Number(process.env.NEXT_PUBLIC_ADMIN_PORT) || 38,
            analyzer: Number(process.env.NEXT_PUBLIC_ANALYZER_PORT) || 31,
            summarizer: Number(process.env.NEXT_PUBLIC_SUMMARIZER_PORT) || 32,
            translator: Number(process.env.NEXT_PUBLIC_TRANSLATOR_PORT) || 33,
            factChecker: Number(process.env.NEXT_PUBLIC_FACT_CHECKER_PORT) || 34,
            collab: Number(process.env.NEXT_PUBLIC_COLLAB_PORT) || 36,
            interrogator: Number(process.env.NEXT_PUBLIC_INTERROGATOR_PORT) || 82,
            deepChat: Number(process.env.NEXT_PUBLIC_DEEP_CHAT_PORT) || 35,
        },
        apiPorts: {
            collab: Number(process.env.NEXT_PUBLIC_COLLAB_API_PORT) || 86,
            irp: Number(process.env.NEXT_PUBLIC_IRP_API_PORT) || 81,
        },
        routes: {
            analyzer: Number(process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE) || 81,
            summarizer: Number(process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE) || 82,
            translator: Number(process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE) || 83,
            factChecker: Number(process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE) || 84,
            deepChat: Number(process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE) || 85,
            interrogator: Number(process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE) || 87,
        },
    },
};

export const getApiUrl = (service: keyof typeof config.server.routes) => {
    const { ip, apiPorts, routes } = config.server;
    return `http://${ip}:${apiPorts.irp}/${routes[service]}/`;
}; 