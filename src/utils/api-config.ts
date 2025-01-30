/**
 * Utility for generating API URLs
 */
export const getApiUrl = (service: string, path: string = '') => {
  const baseUrl = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}`;
  const apiPort = process.env.NEXT_PUBLIC_IRP_API_PORT;

  const routes = {
    analyzer: process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE,
    summarizer: process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE,
    translator: process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE,
    factChecker: process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE,
    deepChat: process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE,
    interrogator: process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE,
    collab: process.env.NEXT_PUBLIC_COLLAB_API_PORT
  };

  return `${baseUrl}:${apiPort}/${routes[service]}${path}`;
};

export const getFrontendUrl = (service: string, path: string = '') => {
  const baseUrl = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}`;
  
  const ports = {
    admin: process.env.NEXT_PUBLIC_ADMIN_PORT,
    analyzer: process.env.NEXT_PUBLIC_ANALYZER_PORT,
    summarizer: process.env.NEXT_PUBLIC_SUMMARIZER_PORT,
    translator: process.env.NEXT_PUBLIC_TRANSLATOR_PORT,
    factChecker: process.env.NEXT_PUBLIC_FACT_CHECKER_PORT,
    collab: process.env.NEXT_PUBLIC_COLLAB_PORT,
    interrogator: process.env.NEXT_PUBLIC_INTERROGATOR_PORT,
    deepChat: process.env.NEXT_PUBLIC_DEEP_CHAT_PORT
  };

  return `${baseUrl}:${ports[service]}${path}`;
}; 