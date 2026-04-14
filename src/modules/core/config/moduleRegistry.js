export const moduleRegistry = {
  tcmi: {
    id: "tcmi",
    name: "TCMI",
    basePath: "/brands/tcmi",
  },
};

export const getModuleById = (moduleId) => moduleRegistry[moduleId];
