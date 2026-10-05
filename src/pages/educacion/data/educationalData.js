import composteraCajonImg from '../../../assets/compostera-cajon.png';
import composteraPozoImg from '../../../assets/compostera-pozo.png';
import lumbricarioImg from '../../../assets/lumbricario.png';
import biodigestorImg from '../../../assets/biodigestor.png';

export const SYSTEMS_DATA = [
  {
    id: 'cajon',
    tag: 'Sistema Modular Apilable',
    title: 'Compostera cajón',
    image: composteraCajonImg,
    ideal: 'Ideal: Patios, balcones y terrazas',
    estructura: 'Módulos o cajones apilables fabricados en madera tratada o plástico reciclado.',
    funcionamiento: 'Se colocan residuos orgánicos por niveles mezclando restos húmedos y material seco aeróbico.',
    producto: 'Compost sólido maduro, de aroma a tierra húmeda y alto poder fertilizante.',
    ventajas: 'Diseño compacto, muy ordenado e ideal para espacios urbanos reducidos.'
  },
  {
    id: 'pozo',
    tag: 'Directo en la Tierra',
    title: 'Compostera pozo',
    image: composteraPozoImg,
    ideal: 'Ideal: Jardines amplios y terrenos',
    estructura: 'Fosa excavada en el suelo de 30 a 60 cm de profundidad con cubierta natural.',
    funcionamiento: 'Los restos se depositan directamente sobre la tierra cubriéndose con mantillo u hojas secas.',
    producto: 'Humus natural bio-integrado directamente en el sustrato del terreno.',
    ventajas: 'Cero costo de estructura, descomposición 100% natural e imperceptible.'
  },
  {
    id: 'lumbricario',
    tag: 'Lumbricario Biológico',
    title: 'Lumbricario',
    image: lumbricarioImg,
    ideal: 'Ideal: Espacios de alta eficiencia',
    estructura: 'Contenedor multinivel con ventilación lateral y colector inferior de lixiviados.',
    funcionamiento: 'Lombrices rojas californianas digieren la materia orgánica acelerando la biotransformación.',
    producto: "Humus sólido de alta concentración y fertilizante líquido ('Té de lombriz').",
    ventajas: 'Proceso súper rápido, sin malos olores y rico en microorganismos benéficos.'
  },
  {
    id: 'biodigestor',
    tag: 'Energía & Biogás',
    title: 'Biodigestor',
    image: biodigestorImg,
    ideal: 'Ideal: Hogares sostenibles y granjas',
    estructura: 'Tanque hermético con cámara de fermentación anaeróbica y válvulas de escape.',
    funcionamiento: 'Microorganismos metanogénicos descomponen los desechos orgánicos en ausencia de oxígeno.',
    producto: 'Biogás limpio para cocción/energía y biofertilizante líquido concentrado.',
    ventajas: 'Genera energía renovable limpia y elimina por completo las emisiones.'
  }
];

export const COMPOSTABLE_CATEGORIES = [
  {
    id: 'secos',
    title: 'Materiales secos y absorbentes',
    tag: 'Materia Seca / Carbono',
    items: [
      'Papel y cartón sin tinta ni plastificado, trozados.',
      'Aserrín o viruta de madera natural (sin barniz ni pintura).'
    ]
  },
  {
    id: 'jardin',
    title: 'Restos de jardín y vegetación',
    tag: 'Residuos Verdes / Poda',
    items: [
      'Hojas secas, flores marchitas y pasto cortado.',
      'Pequeñas ramas, poda blanda o residuos vegetales de huerta.'
    ]
  },
  {
    id: 'alimentos',
    title: 'Restos de alimentos vegetales',
    tag: 'Restos de Cocina / Humedad',
    items: [
      'Cáscaras, restos de frutas y verduras.',
      'Yerba mate, té y café usados (con filtro de papel incluido).',
      'Cáscaras de huevo trituradas.'
    ]
  }
];

export const AVOID_ITEMS = [
  {
    text: 'Carnes, huesos, aceites y lácteos.',
    tag: 'Atracción de fauna nociva',
    icon: '🥩'
  },
  {
    text: 'Restos cocidos, salados o condimentados.',
    tag: 'Inhibe descomposición benéfica',
    icon: '🍲'
  },
  {
    text: 'Cítricos en exceso.',
    tag: 'Exceso de acidez en el sustrato',
    icon: '🍋'
  },
  {
    text: 'Plásticos, vidrios, metales o productos químicos.',
    tag: 'Inorgánico no biodegradable',
    icon: '🚫'
  }
];