import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Avataring',
      version: '1.0.0',
      description: 'Auto-generated Swagger docs with TypeScript and Express',
    },
  },
  // Globs pointing to your route files for auto-generation
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
