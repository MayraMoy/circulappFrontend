import {
  Square3Stack3DIcon,
  QueueListIcon,
  BugAntIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export const SYSTEMS_DATA = [
  {
    id: 'cajon',
    tag: 'Sistema Modular Apilable',
    title: 'Compostera Cajón',
    Icon: Square3Stack3DIcon,
    ideal: 'Ideal: Patios, balcones y terrazas',
    estructura: 'Módulos o cajones apilables fabricados en madera tratada o plástico reciclado.',
    funcionamiento: 'Se colocan residuos orgánicos por niveles mezclando restos húmedos y material seco aeróbico.',
    producto: 'Compost sólido maduro, de aroma a tierra húmeda y alto poder fertilizante.',
    ventajas: 'Diseño compacto, muy ordenado e ideal para espacios urbanos reducidos.'
  },
  {
    id: 'pozo',
    tag: 'Directo en la Tierra',
    title: 'Compostera de Pozo',
    Icon: QueueListIcon,
    ideal: 'Ideal: Jardines amplios y terrenos',
    estructura: 'Fosa excavada en el suelo de 30 a 60 cm de profundidad con cubierta natural.',
    funcionamiento: 'Los restos se depositan directamente sobre la tierra cubriéndose con mantillo u hojas secas.',
    producto: 'Humus natural bio-integrado directamente en el sustrato del terreno.',
    ventajas: 'Cero costo de estructura, descomposición 100% natural e imperceptible.'
  },
  {
    id: 'lumbricario',
    tag: 'Lumbricario Biológico',
    title: 'Vermicompostera',
    Icon: BugAntIcon,
    ideal: 'Ideal: Espacios de alta eficiencia',
    estructura: 'Contenedor multinivel con ventilación lateral y colector inferior de lixiviados.',
    funcionamiento: 'Lombrices rojas californianas digieren la materia orgánica acelerando la biotransformación.',
    producto: "Humus sólido de alta concentración y fertilizante líquido ('Té de lombriz').",
    ventajas: 'Proceso súper rápido, sin malos olores y rico en microorganismos benéficos.'
  },
  {
    id: 'biodigestor',
    tag: 'Energía & Biogás',
    title: 'Biodigestor Urbano',
    Icon: BoltIcon,
    ideal: 'Ideal: Hogares sostenibles y granjas',
    estructura: 'Tanque hermético con cámara de fermentación anaeróbica y válvulas de escape.',
    funcionamiento: 'Microorganismos metanogénicos descomponen los desechos orgánicos en ausencia de oxígeno.',
    producto: 'Biogás limpio para cocción/energía y biofertilizante líquido concentrado.',
    ventajas: 'Genera energía renovable limpia y elimina por completo las emisiones.'
  }
];