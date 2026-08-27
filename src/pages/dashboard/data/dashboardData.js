export const CATEGORY_NAMES = {
  plastico: "Plástico",
  papel: "Papel y Cartón",
  vidrio: "Vidrio",
  metal: "Metal",
  textil: "Textil",
  electronico: "Electrónico",
  otro: "Otro",
};

export const GESTOR_TABS = [
  { id: "pending", name: "Ítems Pendientes de Procesamiento" },
  { id: "toValidate", name: "Fardos Pendientes de Validación" },
  { id: "reports", name: "Denuncias y Moderación" },
];

export const ADMIN_REPORTS = [
  { title: "Reporte Mensual", sub: "Resumen general de actividad.", endpoint: "/api/admin/reports/monthly" },
  { title: "Reporte Ambiental", sub: "CO₂ ahorrado y reciclaje.", endpoint: "/api/admin/reports/environmental" },
  { title: "Reporte de Validaciones", sub: "Materiales certificados.", endpoint: "/api/admin/reports/validations" },
];