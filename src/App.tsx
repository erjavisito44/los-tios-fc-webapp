import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  Trophy,
  Users,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  ArrowUpDown,
  Search,
  X,
  Goal,
  Footprints,
  Star,
  Shield,
  Filter,
  AlertTriangle,
  Crosshair,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Sliders,
  FileText,
  CheckCircle2,
  Scale,
  Sparkles,
  Instagram,
} from 'lucide-react';

// ============================================================================
// 1. CAPA DE DATOS ESTRUCTURADOS (100% REALES · IMD SEVILLA & ONZEGOL)
// ============================================================================

const settingsData = {
  displayName: 'LOS TIOS FC',
  division: 'IMD SEVILLA · FÚTBOL SALA (CET)',
  onzegolUrl: 'https://onzegol.com/e/los-tios',
  imdUrl: 'https://imd.sevilla.org/apps/jjddmm_resultados/#',
  instagramHandle: '@los_tios_fc',
  instagramUrl: 'https://www.instagram.com/los_tios_fc/',
  ourTeamId: 't1',
  totalMatchdays: 14,
};

// Publicaciones oficiales de Instagram para la pestaña Social (de más reciente a más antigua)
const instagramLatestPost =
  'https://www.instagram.com/reel/DgFNaLzN_dg/?utm_source=ig_embed&utm_campaign=loading';

const instagramGalleryPosts = [
  'https://www.instagram.com/p/DgCYqOwN2bf/?utm_source=ig_embed&utm_campaign=loading',
  'https://www.instagram.com/reel/DfzSBN3t9lr/?utm_source=ig_embed&utm_campaign=loading',
  'https://www.instagram.com/p/DfwLBwcNazL/?utm_source=ig_embed&utm_campaign=loading',
  'https://www.instagram.com/p/DfcFoLfM2bx/?utm_source=ig_embed&utm_campaign=loading',
  'https://www.instagram.com/reel/DfcC3Mhs88y/?utm_source=ig_embed&utm_campaign=loading',
];

// 8 equipos reales del grupo (nombre unificado exclusivamente como LOS TIOS FC)
const teamsData = [
  { id: 't1', name: 'LOS TIOS FC', shortName: 'LOS TIOS', isOurs: true, pnp: 0 },
  { id: 't2', name: 'LA BALOMPÉDICA', shortName: 'BALOMPÉDICA', isOurs: false, pnp: 0 },
  { id: 't3', name: 'LA ORDEN F. S.', shortName: 'LA ORDEN', isOurs: false, pnp: 0 },
  { id: 't4', name: 'BDP POST PARTIDO', shortName: 'BDP', isOurs: false, pnp: 0 },
  { id: 't5', name: 'GOAT F.C.', shortName: 'GOAT', isOurs: false, pnp: 0 },
  { id: 't6', name: 'BATMÓVIL F.C.', shortName: 'BATMÓVIL', isOurs: false, pnp: 0 },
  { id: 't7', name: 'DEPORTIVO DE TRIANA', shortName: 'DEP. TRIANA', isOurs: false, pnp: 0 },
  { id: 't8', name: 'ISS PRO 2027', shortName: 'ISS PRO', isOurs: false, pnp: 0 },
];

// 14 jornadas reales (J1-J3 con resultados definitivos, J4-J14 calendario oficial)
const matchesData = [
  // Jornada 1
  { id: 'j1-triana-orden', matchday: 1, date: '08/11/2026', time: '12:00', homeId: 't7', awayId: 't3', homeGoals: 2, awayGoals: 3, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j1-goat-bdp', matchday: 1, date: '08/11/2026', time: '12:00', homeId: 't5', awayId: 't4', homeGoals: 5, awayGoals: 4, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j1-iss-tios', matchday: 1, date: '07/11/2026', time: '17:30', homeId: 't8', awayId: 't1', homeGoals: 0, awayGoals: 2, played: true, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'SABADO' },
  { id: 'j1-batmovil-balompedica', matchday: 1, date: '08/11/2026', time: '10:00', homeId: 't6', awayId: 't2', homeGoals: 2, awayGoals: 6, played: true, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },

  // Jornada 2
  { id: 'j2-orden-batmovil', matchday: 2, date: '15/11/2026', time: '10:00', homeId: 't3', awayId: 't6', homeGoals: 10, awayGoals: 1, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j2-bdp-triana', matchday: 2, date: '16/11/2026', time: '21:30', homeId: 't4', awayId: 't7', homeGoals: 5, awayGoals: 3, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },
  { id: 'j2-tios-goat', matchday: 2, date: '15/11/2026', time: '13:00', homeId: 't1', awayId: 't5', homeGoals: 3, awayGoals: 2, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'CC 2' },
  { id: 'j2-balompedica-iss', matchday: 2, date: '15/11/2026', time: '12:00', homeId: 't2', awayId: 't8', homeGoals: 4, awayGoals: 2, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },

  // Jornada 3
  { id: 'j3-goat-balompedica', matchday: 3, date: '22/11/2026', time: '12:00', homeId: 't5', awayId: 't2', homeGoals: 2, awayGoals: 4, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j3-batmovil-iss', matchday: 3, date: '22/11/2026', time: '09:00', homeId: 't6', awayId: 't8', homeGoals: 5, awayGoals: 1, played: true, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },
  { id: 'j3-triana-tios', matchday: 3, date: '22/11/2026', time: '12:00', homeId: 't7', awayId: 't1', homeGoals: 1, awayGoals: 2, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j3-orden-bdp', matchday: 3, date: '22/11/2026', time: '10:00', homeId: 't3', awayId: 't4', homeGoals: 1, awayGoals: 1, played: true, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },

  // Jornada 4 (Próximo partido: LOS TIOS FC vs LA ORDEN F. S.)
  { id: 'j4-balompedica-triana', matchday: 4, date: '29/11/2026', time: '12:00', homeId: 't2', awayId: 't7', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j4-tios-orden', matchday: 4, date: '29/11/2026', time: '11:00', homeId: 't1', awayId: 't3', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j4-iss-goat', matchday: 4, date: '28/11/2026', time: '18:30', homeId: 't8', awayId: 't5', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'SABADO' },
  { id: 'j4-bdp-batmovil', matchday: 4, date: '30/11/2026', time: '21:30', homeId: 't4', awayId: 't6', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },

  // Jornada 5
  { id: 'j5-orden-balompedica', matchday: 5, date: '13/12/2026', time: '10:00', homeId: 't3', awayId: 't2', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j5-triana-iss', matchday: 5, date: '13/12/2026', time: '12:00', homeId: 't7', awayId: 't8', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j5-batmovil-goat', matchday: 5, date: '13/12/2026', time: '09:00', homeId: 't6', awayId: 't5', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },
  { id: 'j5-bdp-tios', matchday: 5, date: '14/12/2026', time: '21:30', homeId: 't4', awayId: 't1', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },

  // Jornada 6
  { id: 'j6-batmovil-tios', matchday: 6, date: '20/12/2026', time: '10:00', homeId: 't6', awayId: 't1', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },
  { id: 'j6-iss-orden', matchday: 6, date: '19/12/2026', time: '18:00', homeId: 't8', awayId: 't3', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'SABADO' },
  { id: 'j6-goat-triana', matchday: 6, date: '20/12/2026', time: '12:00', homeId: 't5', awayId: 't7', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j6-balompedica-bdp', matchday: 6, date: '17/12/2026', time: '21:00', homeId: 't2', awayId: 't4', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-3-CARRETERA MURO DEFENSA S/N', obs: 'CC 4' },

  // Jornada 7
  { id: 'j7-bdp-iss', matchday: 7, date: '11/01/2027', time: '21:30', homeId: 't4', awayId: 't8', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },
  { id: 'j7-triana-batmovil', matchday: 7, date: '10/01/2027', time: '12:00', homeId: 't7', awayId: 't6', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j7-orden-goat', matchday: 7, date: '10/01/2027', time: '10:00', homeId: 't3', awayId: 't5', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j7-tios-balompedica', matchday: 7, date: '10/01/2027', time: '11:00', homeId: 't1', awayId: 't2', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },

  // Jornada 8
  { id: 'j8-orden-triana', matchday: 8, date: '17/01/2027', time: '10:00', homeId: 't3', awayId: 't7', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j8-bdp-goat', matchday: 8, date: '18/01/2027', time: '21:30', homeId: 't4', awayId: 't5', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },
  { id: 'j8-tios-iss', matchday: 8, date: '17/01/2027', time: '11:00', homeId: 't1', awayId: 't8', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j8-balompedica-batmovil', matchday: 8, date: '17/01/2027', time: '12:00', homeId: 't2', awayId: 't6', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },

  // Jornada 9
  { id: 'j9-batmovil-orden', matchday: 9, date: '24/01/2027', time: '09:00', homeId: 't6', awayId: 't3', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },
  { id: 'j9-triana-bdp', matchday: 9, date: '24/01/2027', time: '12:00', homeId: 't7', awayId: 't4', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j9-goat-tios', matchday: 9, date: '24/01/2027', time: '12:00', homeId: 't5', awayId: 't1', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j9-iss-balompedica', matchday: 9, date: '23/01/2027', time: '16:00', homeId: 't8', awayId: 't2', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'SABADO' },

  // Jornada 10
  { id: 'j10-balompedica-goat', matchday: 10, date: '07/02/2027', time: '12:00', homeId: 't2', awayId: 't5', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j10-iss-batmovil', matchday: 10, date: '06/02/2027', time: '16:00', homeId: 't8', awayId: 't6', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'SABADO' },
  { id: 'j10-tios-triana', matchday: 10, date: '07/02/2027', time: '11:00', homeId: 't1', awayId: 't7', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j10-bdp-orden', matchday: 10, date: '08/02/2027', time: '21:30', homeId: 't4', awayId: 't3', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },

  // Jornada 11
  { id: 'j11-triana-balompedica', matchday: 11, date: '14/02/2027', time: '12:00', homeId: 't7', awayId: 't2', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j11-orden-tios', matchday: 11, date: '14/02/2027', time: '10:00', homeId: 't3', awayId: 't1', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j11-goat-iss', matchday: 11, date: '14/02/2027', time: '12:00', homeId: 't5', awayId: 't8', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j11-batmovil-bdp', matchday: 11, date: '14/02/2027', time: '09:00', homeId: 't6', awayId: 't4', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },

  // Jornada 12
  { id: 'j12-balompedica-orden', matchday: 12, date: '21/02/2027', time: '12:00', homeId: 't2', awayId: 't3', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j12-iss-triana', matchday: 12, date: '21/02/2027', time: '10:00', homeId: 't8', awayId: 't7', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },
  { id: 'j12-goat-batmovil', matchday: 12, date: '21/02/2027', time: '12:00', homeId: 't5', awayId: 't6', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j12-tios-bdp', matchday: 12, date: '21/02/2027', time: '11:00', homeId: 't1', awayId: 't4', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },

  // Jornada 13
  { id: 'j13-tios-batmovil', matchday: 13, date: '07/03/2027', time: '11:00', homeId: 't1', awayId: 't6', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j13-orden-iss', matchday: 13, date: '07/03/2027', time: '10:00', homeId: 't3', awayId: 't8', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j13-triana-goat', matchday: 13, date: '07/03/2027', time: '12:00', homeId: 't7', awayId: 't5', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j13-bdp-balompedica', matchday: 13, date: '08/03/2027', time: '21:30', homeId: 't4', awayId: 't2', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'LUNES' },

  // Jornada 14
  { id: 'j14-iss-bdp', matchday: 14, date: '13/03/2027', time: '16:00', homeId: 't8', awayId: 't4', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'SABADO' },
  { id: 'j14-batmovil-triana', matchday: 14, date: '14/03/2027', time: '09:00', homeId: 't6', awayId: 't7', homeGoals: null, awayGoals: null, played: false, venue: 'CD. TIRO DE LINEA PABELLON-C/ LORA DEL RIO, S/N', obs: 'DOMINGO' },
  { id: 'j14-goat-orden', matchday: 14, date: '14/03/2027', time: '12:00', homeId: 't5', awayId: 't3', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-4-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
  { id: 'j14-balompedica-tios', matchday: 14, date: '14/03/2027', time: '12:00', homeId: 't2', awayId: 't1', homeGoals: null, awayGoals: null, played: false, venue: 'CD. VEGA DE TRIANA FS PISTA-1-CARRETERA MURO DEFENSA S/N', obs: 'DOMINGO' },
];

// 12 jugadores reales con posiciones exactas y estadísticas reales (sin puntos fantasy)
const playersData = [
  { id: 'p1', name: 'José', role: 'Portero', pj: 3, goals: 0, assists: 0, mvp: 1, yellowCards: 0, conceded: 3 },
  { id: 'p2', name: 'Esteban', role: 'Delantero', pj: 3, goals: 2, assists: 2, mvp: 1, yellowCards: 1, conceded: 0 },
  { id: 'p3', name: 'Antonio', role: 'Medio', pj: 3, goals: 2, assists: 1, mvp: 0, yellowCards: 0, conceded: 0 },
  { id: 'p4', name: 'Isra', role: 'Delantero', pj: 2, goals: 2, assists: 0, mvp: 1, yellowCards: 0, conceded: 0 },
  { id: 'p5', name: 'Héctor', role: 'Defensa', pj: 3, goals: 0, assists: 0, mvp: 0, yellowCards: 0, conceded: 0 },
  { id: 'p6', name: 'Javier', role: 'Medio', pj: 3, goals: 1, assists: 0, mvp: 0, yellowCards: 0, conceded: 0 },
  { id: 'p7', name: 'Alejandro', role: 'Defensa', pj: 2, goals: 0, assists: 0, mvp: 0, yellowCards: 1, conceded: 0 },
  { id: 'p8', name: 'Mario', role: 'Medio', pj: 3, goals: 0, assists: 0, mvp: 0, yellowCards: 1, conceded: 0 },
  { id: 'p9', name: 'David', role: 'Defensa', pj: 1, goals: 0, assists: 0, mvp: 0, yellowCards: 0, conceded: 0 },
  { id: 'p10', name: 'Raúl', role: 'Defensa', pj: 1, goals: 0, assists: 1, mvp: 0, yellowCards: 0, conceded: 0 },
  { id: 'p11', name: 'Rafa', role: 'Delantero', pj: 1, goals: 0, assists: 0, mvp: 0, yellowCards: 0, conceded: 0 },
  { id: 'p12', name: 'Iván', role: 'Portero', pj: 0, goals: 0, assists: 0, mvp: 0, yellowCards: 0, conceded: 0 },
];

// Estadísticas reales por partido (J1, J2, J3)
const playerMatchStatsData = {
  'j1-iss-tios': [
    { playerId: 'p4', goals: 1, assists: 0, yellow: 0, mvp: true },
    { playerId: 'p1', goals: 0, assists: 0, yellow: 0, mvp: false, saves: 4 },
    { playerId: 'p3', goals: 1, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p9', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p7', goals: 0, assists: 0, yellow: 1, mvp: false },
    { playerId: 'p2', goals: 0, assists: 1, yellow: 1, mvp: false },
    { playerId: 'p5', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p6', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p8', goals: 0, assists: 0, yellow: 0, mvp: false },
  ],
  'j2-tios-goat': [
    { playerId: 'p2', goals: 1, assists: 1, yellow: 0, mvp: true },
    { playerId: 'p3', goals: 1, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p4', goals: 1, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p1', goals: 0, assists: 0, yellow: 0, mvp: false, saves: 4 },
    { playerId: 'p7', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p10', goals: 0, assists: 1, yellow: 0, mvp: false },
    { playerId: 'p5', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p6', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p8', goals: 0, assists: 0, yellow: 0, mvp: false },
  ],
  'j3-triana-tios': [
    { playerId: 'p1', goals: 0, assists: 0, yellow: 0, mvp: true, saves: 10 },
    { playerId: 'p6', goals: 1, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p2', goals: 1, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p3', goals: 0, assists: 1, yellow: 0, mvp: false },
    { playerId: 'p5', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p11', goals: 0, assists: 0, yellow: 0, mvp: false },
    { playerId: 'p8', goals: 0, assists: 0, yellow: 1, mvp: false },
  ],
};

// Informes PREPARTIDO archivados por matchId estable (nunca se sobrescriben)
const preMatchReportsData = {
  'j1-iss-tios': {
    matchId: 'j1-iss-tios',
    matchday: 1,
    generatedAt: '06/11/2026',
    status: 'PREPARTIDO',
    rivalId: 't8',
    rivalName: 'ISS PRO 2027',
    rivalPosBefore: null,
    rivalPtsBefore: 0,
    ourPosBefore: null,
    ourPtsBefore: 0,
    sampleNotice: 'Jornada 1: sin partidos previos disputados en esta competición.',
    probabilities: { win: 34, draw: 32, loss: 34 },
    expectedGoals: { home: 1.5, away: 1.5 },
    keyContext: 'Estreno liguero en el Pabellón CD Tiro de Línea.',
  },
  'j2-tios-goat': {
    matchId: 'j2-tios-goat',
    matchday: 2,
    generatedAt: '13/11/2026',
    status: 'PREPARTIDO',
    rivalId: 't5',
    rivalName: 'GOAT F.C.',
    rivalPosBefore: 2,
    rivalPtsBefore: 3,
    ourPosBefore: 3,
    ourPtsBefore: 3,
    sampleNotice: 'Muestra pequeña (1 jornada disputada). Estimación orientativa.',
    probabilities: { win: 46, draw: 24, loss: 30 },
    expectedGoals: { home: 2.3, away: 2.1 },
    keyContext: 'GOAT F.C. ganó 5-4 a BDP Post Partido en J1; LOS TIOS FC venció 0-2 a ISS Pro 2027.',
  },
  'j3-triana-tios': {
    matchId: 'j3-triana-tios',
    matchday: 3,
    generatedAt: '20/11/2026',
    status: 'PREPARTIDO',
    rivalId: 't7',
    rivalName: 'DEPORTIVO DE TRIANA',
    rivalPosBefore: 6,
    rivalPtsBefore: 0,
    ourPosBefore: 2,
    ourPtsBefore: 6,
    sampleNotice: 'Muestra pequeña (2 jornadas disputadas). Estimación orientativa.',
    probabilities: { win: 56, draw: 21, loss: 23 },
    expectedGoals: { home: 1.9, away: 2.5 },
    keyContext: 'DEPORTIVO DE TRIANA encajó 8 goles en 2 partidos. LOS TIOS FC suma 6 pts (5 TF, 2 TC).',
  },
  'j4-tios-orden': {
    matchId: 'j4-tios-orden',
    matchday: 4,
    generatedAt: '26/11/2026',
    status: 'PREPARTIDO',
    rivalId: 't3',
    rivalName: 'LA ORDEN F. S.',
    rivalPosBefore: 3,
    rivalPtsBefore: 7,
    ourPosBefore: 2,
    ourPtsBefore: 9,
    sampleNotice: 'Muestra reducida (3 jornadas disputadas por equipo). Probabilidades y xG orientativos.',
    probabilities: { win: 44, draw: 25, loss: 31 },
    expectedGoals: { home: 2.6, away: 2.8 },
    keyContext: 'Duelo directo en la zona alta: LOS TIOS FC (9 pts, 7 TF, 3 TC) ante LA ORDEN F. S. (7 pts, 14 TF, 4 TC).',
  },
};

// Informes POSTPARTIDO vinculados a matchId
const postMatchReportsData = {
  'j1-iss-tios': {
    matchId: 'j1-iss-tios',
    matchday: 1,
    recordedAt: '08/11/2026',
    finalScore: { home: 0, away: 2 },
    standingsConsequence: 'LOS TIOS FC inicia la liga con 3 puntos y 0 tantos encajados.',
    automaticConclusion:
      'LOS TIOS FC cumplió con solvencia en su estreno (0-2), dejando la portería a cero y superando la previsión inicial equilibrada.',
  },
  'j2-tios-goat': {
    matchId: 'j2-tios-goat',
    matchday: 2,
    recordedAt: '15/11/2026',
    finalScore: { home: 3, away: 2 },
    standingsConsequence: 'LOS TIOS FC alcanza 6 puntos (2/2 victorias).',
    automaticConclusion:
      'Victoria ajustada (3-2) con 5 goles totales (por encima de los 4.4 xG combinados previstos), confirmando la tendencia favorable estimada.',
  },
  'j3-triana-tios': {
    matchId: 'j3-triana-tios',
    matchday: 3,
    recordedAt: '22/11/2026',
    finalScore: { home: 1, away: 2 },
    standingsConsequence: 'LOS TIOS FC suma 9 puntos (3/3 victorias, +4 DG).',
    automaticConclusion:
      'Triunfo visitante (1-2) respaldado por las 10 paradas de José (MVP) y un marcador total de 3 tantos (por debajo de los 4.4 xG estimados).',
  },
};

// ============================================================================
// 2. FUNCIONES DE CÁLCULO Y RECONSTRUCCIÓN HISTÓRICA
// ============================================================================

function buildStandingsUpToMatchday(matches, teams, upToMatchday) {
  const safeMatches = Array.isArray(matches) ? matches : [];
  const safeTeams = Array.isArray(teams) ? teams : [];

  const table = safeTeams.map((team) => ({
    ...team,
    pj: 0,
    pg: 0,
    pe: 0,
    pp: 0,
    pnp: team.pnp || 0,
    tf: 0,
    tc: 0,
    dg: 0,
    puntos: 0,
    form: [],
    homeRecord: { pj: 0, pg: 0, pe: 0, pp: 0, tf: 0, tc: 0, pts: 0 },
    awayRecord: { pj: 0, pg: 0, pe: 0, pp: 0, tf: 0, tc: 0, pts: 0 },
  }));

  const map = Object.fromEntries(table.map((t) => [t.id, t]));

  const relevant = safeMatches
    .filter(
      (m) =>
        m.matchday <= upToMatchday &&
        m.played &&
        m.homeGoals !== null &&
        m.awayGoals !== null
    )
    .sort((a, b) => a.matchday - b.matchday);

  relevant.forEach((m) => {
    const home = map[m.homeId];
    const away = map[m.awayId];
    if (!home || !away) return;

    home.pj += 1;
    away.pj += 1;
    home.homeRecord.pj += 1;
    away.awayRecord.pj += 1;

    home.tf += m.homeGoals;
    home.tc += m.awayGoals;
    home.homeRecord.tf += m.homeGoals;
    home.homeRecord.tc += m.awayGoals;

    away.tf += m.awayGoals;
    away.tc += m.homeGoals;
    away.awayRecord.tf += m.awayGoals;
    away.awayRecord.tc += m.homeGoals;

    if (m.homeGoals > m.awayGoals) {
      home.pg += 1;
      home.puntos += 3;
      home.homeRecord.pg += 1;
      home.homeRecord.pts += 3;
      home.form.push('W');

      away.pp += 1;
      away.awayRecord.pp += 1;
      away.form.push('L');
    } else if (m.homeGoals < m.awayGoals) {
      away.pg += 1;
      away.puntos += 3;
      away.awayRecord.pg += 1;
      away.awayRecord.pts += 3;
      away.form.push('W');

      home.pp += 1;
      home.homeRecord.pp += 1;
      home.form.push('L');
    } else {
      home.pe += 1;
      home.puntos += 1;
      home.homeRecord.pe += 1;
      home.homeRecord.pts += 1;
      home.form.push('D');

      away.pe += 1;
      away.puntos += 1;
      away.awayRecord.pe += 1;
      away.awayRecord.pts += 1;
      away.form.push('D');
    }
  });

  table.forEach((t) => {
    t.dg = t.tf - t.tc;
  });

  table.sort((a, b) => {
    if (b.puntos !== a.puntos) return b.puntos - a.puntos;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.tf !== a.tf) return b.tf - a.tf;
    return a.name.localeCompare(b.name);
  });

  return table.map((item, idx) => ({
    ...item,
    position: idx + 1,
  }));
}

function computeStreakMetrics(formArray = []) {
  let currentType = null;
  let currentLength = 0;

  for (let i = formArray.length - 1; i >= 0; i--) {
    const res = formArray[i];
    if (i === formArray.length - 1) {
      currentType = res;
      currentLength = 1;
    } else if (res === currentType) {
      currentLength += 1;
    } else {
      break;
    }
  }

  let maxWinStreak = 0;
  let runningWin = 0;
  let maxLossStreak = 0;
  let runningLoss = 0;

  formArray.forEach((r) => {
    if (r === 'W') {
      runningWin += 1;
      maxWinStreak = Math.max(maxWinStreak, runningWin);
      runningLoss = 0;
    } else if (r === 'L') {
      runningLoss += 1;
      maxLossStreak = Math.max(maxLossStreak, runningLoss);
      runningWin = 0;
    } else {
      runningWin = 0;
      runningLoss = 0;
    }
  });

  const currentLabel =
    currentLength === 0
      ? 'Sin partidos'
      : currentType === 'W'
      ? `${currentLength}V`
      : currentType === 'D'
      ? `${currentLength}E`
      : `${currentLength}D`;

  return {
    currentType,
    currentLength,
    currentLabel,
    maxWinStreak,
    maxLossStreak,
  };
}

// ============================================================================
// 3. ESCUDO DE "LOS TIOS FC", INCRUSTACIÓN INSTAGRAM Y GRÁFICA DE EVOLUCIÓN
// ============================================================================

function LosTiosCrest({ className = 'w-11 h-11' }) {
  return (
    <img
      src="/escudo-los-tios.png"
      alt="Escudo LOS TIOS FC"
      className={`${className} rounded-full object-contain shrink-0 select-none`}
    />
  );
}

function InstagramEmbedCard({ permalink, featured = false }) {
  return (
    <div
      className={`w-full max-w-full overflow-x-hidden bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-1 sm:p-4 flex justify-center ${
        featured ? 'w-full' : ''
      }`}
    >
      <div
        className={`w-full max-w-full flex justify-center overflow-hidden rounded-xl ${
          featured ? 'max-w-[540px] mx-auto' : 'max-w-[400px] mx-auto'
        }`}
      >
        <div className="-mt-[54px] -mb-[162px] w-full flex justify-center scale-[0.90] sm:scale-100 origin-top">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={permalink}
            data-instgrm-version="14"
            style={{
              background: '#09090b',
              border: '0',
              borderRadius: '12px',
              boxShadow: 'none',
              margin: '0 auto',
              maxWidth: '100%',
              minWidth: '0',
              padding: '0',
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MatchdayEvolutionChart({
  matchdays = [],
  seriesList = [],
  metric = 'position',
  onChangeMetric,
  title = 'Evolución por jornada',
  subtitle = '',
}) {
  const safeMatchdays = matchdays.length > 0 ? matchdays : [1];
  const width = 640;
  const height = 220;
  const padLeft = 42;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 34;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const xForIndex = (idx) => {
    if (safeMatchdays.length <= 1) return padLeft + plotW / 2;
    return padLeft + (idx / (safeMatchdays.length - 1)) * plotW;
  };

  const allValues = seriesList.flatMap((s) =>
    (s.values || []).filter((v) => v !== null && v !== undefined && !Number.isNaN(Number(v)))
  );

  const minVal =
    metric === 'position' ? 1 : Math.min(0, ...(allValues.length ? allValues : [0]));
  const maxVal =
    metric === 'position' ? 8 : Math.max(4, ...(allValues.length ? allValues : [5]));

  const yForValue = (val) => {
    if (metric === 'position') {
      const ratio = (Number(val) - 1) / Math.max(1, 8 - 1);
      return padTop + ratio * plotH;
    }
    const span = Math.max(1, maxVal - minVal);
    const ratio = (Number(val) - minVal) / span;
    return padTop + (1 - ratio) * plotH;
  };

  const yTicks =
    metric === 'position'
      ? [1, 2, 4, 6, 8]
      : [minVal, Math.round((minVal + maxVal) / 2), maxVal].filter(
          (v, i, arr) => arr.indexOf(v) === i
        );

  return (
    <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white">{title}</h4>
          {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
        </div>
        {typeof onChangeMetric === 'function' && (
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
            {[
              { id: 'position', label: 'Posición' },
              { id: 'points', label: 'Puntos' },
              { id: 'goalsFor', label: 'TF' },
              { id: 'goalsAgainst', label: 'TC' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onChangeMetric(m.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  metric === m.id
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        {seriesList.map((s) => (
          <div key={s.id} className="inline-flex items-center gap-1.5 text-zinc-300">
            <span
              className="w-3 h-1 rounded-full inline-block"
              style={{ backgroundColor: s.color }}
            />
            <span className="font-semibold">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[340px] select-none"
          role="img"
          aria-label={title}
        >
          {yTicks.map((tick) => {
            const y = yForValue(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  x2={width - padRight}
                  y1={y}
                  y2={y}
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#a1a1aa"
                  fontSize="11"
                  fontWeight="600"
                >
                  {metric === 'position' ? `${tick}º` : tick}
                </text>
              </g>
            );
          })}

          {safeMatchdays.map((md, idx) => (
            <text
              key={md}
              x={xForIndex(idx)}
              y={height - 10}
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="11"
              fontWeight="700"
            >
              J{md}
            </text>
          ))}

          {seriesList.map((s) => {
            const vals = Array.isArray(s.values) ? s.values : [];
            const points = vals
              .map((val, idx) => {
                if (val === null || val === undefined || Number.isNaN(Number(val))) return null;
                return {
                  x: xForIndex(idx),
                  y: yForValue(val),
                  val,
                  md: safeMatchdays[idx] ?? idx + 1,
                };
              })
              .filter(Boolean);

            if (points.length === 0) return null;

            const pathD = points
              .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
              .join(' ');

            return (
              <g key={s.id}>
                {points.length > 1 && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.highlight ? '3.2' : '2.2'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={s.highlight ? 1 : 0.85}
                  />
                )}
                {points.map((pt) => (
                  <g key={`${s.id}-j${pt.md}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={s.highlight ? '4.5' : '3.5'}
                      fill="#121215"
                      stroke={s.color}
                      strokeWidth="2.4"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 8}
                      textAnchor="middle"
                      fill="#e4e4e7"
                      fontSize="10"
                      fontWeight="700"
                    >
                      {metric === 'position' ? `${pt.val}º` : pt.val}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// 4. COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'dossier' | 'league' | 'squad' | 'social'
  const [dossierSection, setDossierSection] = useState('overview'); // 'overview' | 'common' | 'compare' | 'profile' | 'simulator' | 'reports'
  const [leagueSection, setLeagueSection] = useState('fixtures'); // 'fixtures' | 'global'

  const [selectedMatchday, setSelectedMatchday] = useState(4);
  const [onlyOurMatches, setOnlyOurMatches] = useState(false);

  const [selectedTeamEvolutionId, setSelectedTeamEvolutionId] = useState('t3');
  const [dossierChartMetric, setDossierChartMetric] = useState('position');
  const [leagueChartMetric, setLeagueChartMetric] = useState('position');

  const [simScenario, setSimScenario] = useState('WIN'); // 'WIN' | 'DRAW' | 'LOSS' | 'CUSTOM'
  const [customOurGoals, setCustomOurGoals] = useState(2);
  const [customRivalGoals, setCustomRivalGoals] = useState(1);

  const [selectedPlayerModal, setSelectedPlayerModal] = useState(null);
  const [selectedMatchModal, setSelectedMatchModal] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [sortConfig, setSortConfig] = useState({ key: 'ga', direction: 'desc' });

  // Cargar y procesar embeds de Instagram cada vez que el usuario entra en 'Social'
  useEffect(() => {
    if (activeTab !== 'social') return;

    const processInstagramEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process();
      }
    };

    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = processInstagramEmbeds;
      document.body.appendChild(script);
    } else {
      processInstagramEmbeds();
    }

    const timer = window.setTimeout(processInstagramEmbeds, 200);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  const playedMatchdays = useMemo(() => {
    const set = new Set(matchesData.filter((m) => m.played).map((m) => m.matchday));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  const latestPlayedMatchday = playedMatchdays.length
    ? playedMatchdays[playedMatchdays.length - 1]
    : 0;

  const standings = useMemo(
    () => buildStandingsUpToMatchday(matchesData, teamsData, latestPlayedMatchday),
    [latestPlayedMatchday]
  );

  const historicalStandingsByMatchday = useMemo(() => {
    return playedMatchdays.map((md) => ({
      matchday: md,
      table: buildStandingsUpToMatchday(matchesData, teamsData, md),
    }));
  }, [playedMatchdays]);

  const getTeamName = (id) => teamsData.find((t) => t.id === id)?.name || 'Equipo';
  const getTeamPosition = (teamId) =>
    standings.find((t) => t.id === teamId)?.position || '-';

  const nextMatch = useMemo(() => {
    return (
      matchesData.find((m) => !m.played && (m.homeId === 't1' || m.awayId === 't1')) ||
      matchesData.filter((m) => m.homeId === 't1' || m.awayId === 't1').slice(-1)[0] ||
      null
    );
  }, []);

  const nextRivalId = useMemo(() => {
    if (!nextMatch) return 't3';
    return nextMatch.homeId === 't1' ? nextMatch.awayId : nextMatch.homeId;
  }, [nextMatch]);

  const ourRow = useMemo(
    () => standings.find((t) => t.id === 't1') || standings[0] || null,
    [standings]
  );

  const rivalRow = useMemo(
    () => standings.find((t) => t.id === nextRivalId) || standings[1] || standings[0] || null,
    [standings, nextRivalId]
  );

  const recentOurMatches = useMemo(() => {
    return matchesData
      .filter((m) => m.played && (m.homeId === 't1' || m.awayId === 't1'))
      .sort((a, b) => a.matchday - b.matchday);
  }, []);

  const getTeamPlayedMatches = (teamId) => {
    return matchesData
      .filter((m) => m.played && (m.homeId === teamId || m.awayId === teamId))
      .sort((a, b) => a.matchday - b.matchday)
      .map((m) => {
        const isHome = m.homeId === teamId;
        const gf = isHome ? m.homeGoals : m.awayGoals;
        const gc = isHome ? m.awayGoals : m.homeGoals;
        const rivalId = isHome ? m.awayId : m.homeId;
        const result = gf > gc ? 'W' : gf < gc ? 'L' : 'D';
        const pts = result === 'W' ? 3 : result === 'D' ? 1 : 0;
        return {
          ...m,
          isHome,
          gf,
          gc,
          rivalId,
          rivalName: getTeamName(rivalId),
          result,
          pts,
        };
      });
  };

  const ourPlayedHistory = useMemo(() => getTeamPlayedMatches('t1'), []);
  const rivalPlayedHistory = useMemo(
    () => getTeamPlayedMatches(nextRivalId),
    [nextRivalId]
  );

  const buildTeamHistorySeries = (teamId) => {
    return historicalStandingsByMatchday.map(({ matchday, table }) => {
      const entry = table.find((r) => r.id === teamId);
      return {
        matchday,
        position: entry?.position ?? null,
        points: entry?.puntos ?? 0,
        goalsFor: entry?.tf ?? 0,
        goalsAgainst: entry?.tc ?? 0,
      };
    });
  };

  const ourHistorySeries = useMemo(
    () => buildTeamHistorySeries('t1'),
    [historicalStandingsByMatchday]
  );
  const rivalHistorySeries = useMemo(
    () => buildTeamHistorySeries(nextRivalId),
    [historicalStandingsByMatchday, nextRivalId]
  );

  const commonOpponentsAnalysis = useMemo(() => {
    const ourByOpponent = new Map();
    ourPlayedHistory.forEach((item) => ourByOpponent.set(item.rivalId, item));

    const rivalByOpponent = new Map();
    rivalPlayedHistory.forEach((item) => rivalByOpponent.set(item.rivalId, item));

    const commonIds = Array.from(ourByOpponent.keys()).filter((id) =>
      rivalByOpponent.has(id)
    );

    const items = commonIds.map((oppId) => {
      const ours = ourByOpponent.get(oppId);
      const rival = rivalByOpponent.get(oppId);
      const ourDiff = ours.gf - ours.gc;
      const rivalDiff = rival.gf - rival.gc;
      const ptsDiff = ours.pts - rival.pts;

      let betterTeam = 'Empate en rendimiento';
      if (ptsDiff > 0 || (ptsDiff === 0 && ourDiff > rivalDiff)) {
        betterTeam = 'LOS TIOS FC';
      } else if (ptsDiff < 0 || (ptsDiff === 0 && rivalDiff > ourDiff)) {
        betterTeam = getTeamName(nextRivalId);
      }

      return {
        opponentId: oppId,
        opponentName: getTeamName(oppId),
        ours,
        rival,
        ourDiff,
        rivalDiff,
        ptsDiff,
        betterTeam,
      };
    });

    const summary = items.reduce(
      (acc, cur) => {
        acc.ourPts += cur.ours.pts;
        acc.rivalPts += cur.rival.pts;
        acc.ourGF += cur.ours.gf;
        acc.ourGC += cur.ours.gc;
        acc.rivalGF += cur.rival.gf;
        acc.rivalGC += cur.rival.gc;
        if (cur.ours.result === 'W') acc.ourW += 1;
        else if (cur.ours.result === 'D') acc.ourD += 1;
        else acc.ourL += 1;

        if (cur.rival.result === 'W') acc.rivalW += 1;
        else if (cur.rival.result === 'D') acc.rivalD += 1;
        else acc.rivalL += 1;
        return acc;
      },
      {
        count: items.length,
        ourPts: 0,
        rivalPts: 0,
        ourGF: 0,
        ourGC: 0,
        rivalGF: 0,
        rivalGC: 0,
        ourW: 0,
        ourD: 0,
        ourL: 0,
        rivalW: 0,
        rivalD: 0,
        rivalL: 0,
      }
    );

    return { items, summary };
  }, [ourPlayedHistory, rivalPlayedHistory, nextRivalId]);

  const rivalProfile = useMemo(() => {
    if (!rivalRow || rivalRow.pj === 0) {
      return {
        traits: ['Sin partidos disputados suficientes para perfil estadístico.'],
        strengths: ['Datos insuficientes'],
        weaknesses: ['Datos insuficientes'],
      };
    }

    const avgFor = rivalRow.tf / rivalRow.pj;
    const avgAgainst = rivalRow.tc / rivalRow.pj;
    const totalMatchesPlayed = standings.reduce((sum, t) => sum + t.pj, 0);
    const totalGoalsScored = standings.reduce((sum, t) => sum + t.tf, 0);
    const leagueAvgGoals = totalMatchesPlayed > 0 ? totalGoalsScored / totalMatchesPlayed : 2;

    const traits = [];
    const strengths = [];
    const weaknesses = [];

    if (avgFor >= leagueAvgGoals + 0.6) {
      traits.push(
        `Alta capacidad goleadora: promedia ${avgFor.toFixed(2)} tantos a favor por partido (media de la liga: ${leagueAvgGoals.toFixed(2)}).`
      );
      strengths.push(`Ataque prolífico (${rivalRow.tf} TF en ${rivalRow.pj} PJ)`);
    } else if (avgFor < 1.5) {
      traits.push(
        `Producción ofensiva moderada: promedia ${avgFor.toFixed(2)} tantos por encuentro.`
      );
      weaknesses.push(`Media goleadora contenida (${avgFor.toFixed(2)} TF/PJ)`);
    } else {
      traits.push(
        `Registro goleador equilibrado: ${rivalRow.tf} tantos a favor (${avgFor.toFixed(2)} por partido).`
      );
    }

    if (avgAgainst <= 1.35) {
      traits.push(
        `Solidez defensiva en los datos registrados: encaja ${avgAgainst.toFixed(2)} tantos por partido (${rivalRow.tc} TC).`
      );
      strengths.push(`Defensa firme (${rivalRow.tc} TC en ${rivalRow.pj} PJ)`);
    } else if (avgAgainst >= leagueAvgGoals) {
      traits.push(
        `Encaja con frecuencia: recibe ${avgAgainst.toFixed(2)} tantos por partido (${rivalRow.tc} TC).`
      );
      weaknesses.push(`Vulnerabilidad defensiva (${avgAgainst.toFixed(2)} TC/PJ)`);
    } else {
      traits.push(
        `Encaja ${avgAgainst.toFixed(2)} tantos por encuentro (${rivalRow.tc} TC en total).`
      );
    }

    const streak = computeStreakMetrics(rivalRow.form);
    if (streak.currentType === 'W') {
      traits.push(`Dinámica positiva: encadena ${streak.currentLabel} en sus últimos partidos.`);
      strengths.push(`Racha activa (${streak.currentLabel})`);
    } else if (streak.currentType === 'L') {
      traits.push(`Dinámica negativa reciente: acumula ${streak.currentLabel}.`);
      weaknesses.push(`Racha reciente adversa (${streak.currentLabel})`);
    } else if (rivalRow.pe > 0) {
      traits.push(`Registra empates (${rivalRow.pe} PE) en su trayectoria.`);
    }

    if (rivalRow.homeRecord.pj > 0 && rivalRow.awayRecord.pj > 0) {
      const homePpg = rivalRow.homeRecord.pts / rivalRow.homeRecord.pj;
      const awayPpg = rivalRow.awayRecord.pts / rivalRow.awayRecord.pj;
      if (homePpg > awayPpg + 0.5) {
        traits.push(
          `Mejor rendimiento como local (${rivalRow.homeRecord.pts} pts en ${rivalRow.homeRecord.pj} PJ) que como visitante (${rivalRow.awayRecord.pts} pts en ${rivalRow.awayRecord.pj} PJ).`
        );
      } else if (awayPpg > homePpg + 0.5) {
        traits.push(
          `Mejor rendimiento como visitante (${rivalRow.awayRecord.pts} pts en ${rivalRow.awayRecord.pj} PJ) que como local (${rivalRow.homeRecord.pts} pts en ${rivalRow.homeRecord.pj} PJ).`
        );
      }
    }

    if (!strengths.length) strengths.push('Sin ventaja estadística destacada por tamaño de muestra');
    if (!weaknesses.length) weaknesses.push('Sin debilidad estadística marcada por tamaño de muestra');

    return { traits, strengths, weaknesses };
  }, [rivalRow, standings]);

  const statisticalForecast = useMemo(() => {
    if (nextMatch && preMatchReportsData[nextMatch.id]) {
      return preMatchReportsData[nextMatch.id];
    }

    const ourPpg = ourRow && ourRow.pj > 0 ? ourRow.puntos / ourRow.pj : 1.5;
    const rivalPpg = rivalRow && rivalRow.pj > 0 ? rivalRow.puntos / rivalRow.pj : 1.5;
    const isHomeOurs = nextMatch?.homeId === 't1';

    const ourOff = ourRow && ourRow.pj > 0 ? ourRow.tf / ourRow.pj : 1.8;
    const ourDef = ourRow && ourRow.pj > 0 ? ourRow.tc / ourRow.pj : 1.8;
    const rivalOff = rivalRow && rivalRow.pj > 0 ? rivalRow.tf / rivalRow.pj : 1.8;
    const rivalDef = rivalRow && rivalRow.pj > 0 ? rivalRow.tc / rivalRow.pj : 1.8;

    const rawOurXg = Math.max(
      0.6,
      Number(((ourOff + rivalDef) / 2 + (isHomeOurs ? 0.15 : -0.05)).toFixed(1))
    );
    const rawRivalXg = Math.max(
      0.6,
      Number(((rivalOff + ourDef) / 2 + (!isHomeOurs ? 0.15 : -0.05)).toFixed(1))
    );

    const diff = ourPpg - rivalPpg + (isHomeOurs ? 0.2 : -0.1);
    const winProb = Math.min(72, Math.max(18, Math.round(42 + diff * 12)));
    const lossProb = Math.min(72, Math.max(15, Math.round(33 - diff * 10)));
    const drawProb = Math.max(10, 100 - winProb - lossProb);

    return {
      matchId: nextMatch?.id || 'upcoming',
      matchday: nextMatch?.matchday || 4,
      generatedAt: '26/11/2026',
      status: 'PREPARTIDO',
      rivalId: nextRivalId,
      rivalName: getTeamName(nextRivalId),
      rivalPosBefore: rivalRow?.position ?? null,
      rivalPtsBefore: rivalRow?.puntos ?? 0,
      ourPosBefore: ourRow?.position ?? null,
      ourPtsBefore: ourRow?.puntos ?? 0,
      sampleNotice: `Muestra reducida (${latestPlayedMatchday} jornadas disputadas). Estimación orientativa.`,
      probabilities: { win: winProb, draw: drawProb, loss: lossProb },
      expectedGoals: {
        home: isHomeOurs ? rawOurXg : rawRivalXg,
        away: isHomeOurs ? rawRivalXg : rawOurXg,
      },
      keyContext: `Ritmo actual: ${ourPpg.toFixed(2)} pts/PJ de LOS TIOS FC frente a ${rivalPpg.toFixed(2)} pts/PJ de ${getTeamName(nextRivalId)}.`,
    };
  }, [nextMatch, nextRivalId, ourRow, rivalRow, latestPlayedMatchday]);

  const simulationResult = useMemo(() => {
    if (!nextMatch) return null;
    const targetMd = nextMatch.matchday;
    const isOursHome = nextMatch.homeId === 't1';

    let ourGoals = 2;
    let rivalGoals = 1;

    if (simScenario === 'WIN') {
      ourGoals = 2;
      rivalGoals = 1;
    } else if (simScenario === 'DRAW') {
      ourGoals = 1;
      rivalGoals = 1;
    } else if (simScenario === 'LOSS') {
      ourGoals = 1;
      rivalGoals = 2;
    } else {
      ourGoals = Math.max(0, Number(customOurGoals) || 0);
      rivalGoals = Math.max(0, Number(customRivalGoals) || 0);
    }

    const simulatedMatch = {
      ...nextMatch,
      played: true,
      homeGoals: isOursHome ? ourGoals : rivalGoals,
      awayGoals: isOursHome ? rivalGoals : ourGoals,
    };

    const updatedMatches = matchesData.map((m) =>
      m.id === nextMatch.id ? simulatedMatch : m
    );

    const projectedTable = buildStandingsUpToMatchday(updatedMatches, teamsData, targetMd);
    const projectedOurs = projectedTable.find((t) => t.id === 't1');

    const otherFixturesInMd = matchesData.filter(
      (m) => m.matchday === targetMd && m.id !== nextMatch.id
    );
    const pendingOtherCount = otherFixturesInMd.filter((m) => !m.played).length;

    const deltaPts = (projectedOurs?.puntos ?? 0) - (ourRow?.puntos ?? 0);

    return {
      projectedTable,
      projectedOurs,
      deltaPts,
      ourGoals,
      rivalGoals,
      pendingOtherCount,
      totalOtherCount: otherFixturesInMd.length,
      isExactPosition: pendingOtherCount === 0,
    };
  }, [nextMatch, simScenario, customOurGoals, customRivalGoals, ourRow]);

  const leagueGlobalMetrics = useMemo(() => {
    const firstMdTable = historicalStandingsByMatchday[0]?.table || standings;
    const lastMdTable =
      historicalStandingsByMatchday[historicalStandingsByMatchday.length - 1]?.table ||
      standings;

    const enriched = standings.map((team) => {
      const streak = computeStreakMetrics(team.form);
      const startPos = firstMdTable.find((t) => t.id === team.id)?.position ?? team.position;
      const endPos = lastMdTable.find((t) => t.id === team.id)?.position ?? team.position;
      const posChange = startPos - endPos;
      return {
        ...team,
        streak,
        startPos,
        endPos,
        posChange,
      };
    });

    return {
      topScorers: [...enriched].sort((a, b) => b.tf - a.tf),
      bestDefenses: [...enriched].sort((a, b) => a.tc - b.tc),
      bestStreaks: [...enriched].sort(
        (a, b) => b.streak.maxWinStreak - a.streak.maxWinStreak || b.puntos - a.puntos
      ),
      worstStreaks: [...enriched].sort(
        (a, b) => b.streak.maxLossStreak - a.streak.maxLossStreak || a.puntos - b.puntos
      ),
      biggestClimbers: [...enriched].sort((a, b) => b.posChange - a.posChange),
      biggestFallers: [...enriched].sort((a, b) => a.posChange - b.posChange),
    };
  }, [standings, historicalStandingsByMatchday]);

  const realLeaders = useMemo(() => {
    const maxGoals = Math.max(...playersData.map((p) => p.goals));
    const pichichis = playersData.filter((p) => p.goals === maxGoals && maxGoals > 0);

    const maxAssists = Math.max(...playersData.map((p) => p.assists));
    const topAssisters = playersData.filter((p) => p.assists === maxAssists && maxAssists > 0);

    const maxMvp = Math.max(...playersData.map((p) => p.mvp));
    const topMvps = playersData.filter((p) => p.mvp === maxMvp && maxMvp > 0);

    const maxYellow = Math.max(...playersData.map((p) => p.yellowCards));
    const topYellow = playersData.filter((p) => p.yellowCards === maxYellow && maxYellow > 0);

    const goalkeeper =
      playersData.find((p) => p.role === 'Portero' && p.pj > 0) ||
      playersData.find((p) => p.role === 'Portero') ||
      playersData[0];

    return {
      maxGoals,
      pichichis,
      maxAssists,
      topAssisters,
      maxMvp,
      topMvps,
      maxYellow,
      topYellow,
      goalkeeper,
    };
  }, []);

  const squadTotals = useMemo(() => {
    return playersData.reduce(
      (acc, p) => ({
        goals: acc.goals + p.goals,
        assists: acc.assists + p.assists,
        mvp: acc.mvp + p.mvp,
        yellowCards: acc.yellowCards + p.yellowCards,
        conceded: acc.conceded + p.conceded,
      }),
      { goals: 0, assists: 0, mvp: 0, yellowCards: 0, conceded: 0 }
    );
  }, []);

  const filteredAndSortedPlayers = useMemo(() => {
    return playersData
      .filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'Todos' || p.role === roleFilter;
        return matchesName && matchesRole;
      })
      .sort((a, b) => {
        const getVal = (pl, key) => {
          if (key === 'ga') return pl.goals + pl.assists;
          return pl[key];
        };
        const valA = getVal(a, sortConfig.key);
        const valB = getVal(b, sortConfig.key);
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return b.pj - a.pj;
      });
  }, [searchQuery, roleFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleOpenOnzegol = (e) => {
    if (e) e.preventDefault();
    window.open(settingsData.onzegolUrl, '_blank', 'noopener,noreferrer');
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Portero':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Defensa':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'Medio':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Delantero':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const renderFormPill = (res, idx) => {
    const label = res === 'W' ? 'V' : res === 'D' ? 'E' : 'D';
    const cls =
      res === 'W'
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        : res === 'D'
        ? 'bg-zinc-700/40 text-zinc-300 border-zinc-600/50'
        : 'bg-red-500/20 text-red-300 border-red-500/40';
    return (
      <span
        key={`${res}-${idx}`}
        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-black border ${cls}`}
      >
        {label}
      </span>
    );
  };

  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'dossier', label: 'Dossier Rival', icon: Crosshair },
    { id: 'league', label: 'Liga IMD', icon: Trophy },
    { id: 'squad', label: 'Plantilla', icon: Users },
    { id: 'social', label: 'Social', icon: Instagram },
  ];

  const visibleMatches = useMemo(() => {
    if (onlyOurMatches) {
      return matchesData.filter((m) => m.homeId === 't1' || m.awayId === 't1');
    }
    return matchesData.filter((m) => m.matchday === selectedMatchday);
  }, [selectedMatchday, onlyOurMatches]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-red-600 selection:text-white">
      {/* ====================================================================
          SIDEBAR ESCRITORIO
      ==================================================================== */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#121215] border-r border-zinc-800/80 z-30">
        <div className="p-5 border-b border-zinc-800/80 flex items-center gap-3.5">
          <LosTiosCrest className="w-12 h-12 drop-shadow-[0_0_12px_rgba(220,38,38,0.35)]" />
          <div className="min-w-0">
            <h1 className="font-black text-base tracking-wide text-white truncate">
              {settingsData.displayName}
            </h1>
            <p className="text-[11px] text-zinc-400 truncate">{settingsData.division}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800/80">
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Posición IMD</span>
              <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-black">
                {ourRow?.position}º · {ourRow?.puntos} pts
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {ourRow?.pj} PJ · {ourRow?.pg} PG · {ourRow?.pe} PE · {ourRow?.pp} PP
            </p>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          CONTENIDO PRINCIPAL
      ==================================================================== */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pb-24 md:pb-8">
        <header className="sticky top-0 z-20 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="md:hidden shrink-0">
                <img
                  src="/escudo-los-tios.png"
                  alt="Escudo LOS TIOS FC"
                  className="w-10 h-10 rounded-full object-contain shrink-0 select-none"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-white truncate">
                  {settingsData.displayName}
                </h2>
                <p className="text-[11px] sm:text-xs text-zinc-400 truncate font-medium">
                  {settingsData.division}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={settingsData.onzegolUrl}
                onClick={handleOpenOnzegol}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all"
              >
                <span>Abrir OnzeGol</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 space-y-6">
          {/* ==============================================================
              1. INICIO
          ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Tarjeta Próximo Partido */}
                <div className="lg:col-span-7 bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -top-14 -right-14 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/15 text-red-400 border border-red-500/30">
                          <Calendar className="w-3.5 h-3.5" />
                          Jornada {nextMatch?.matchday ?? 4} · PREPARTIDO
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Próximo encuentro oficial
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-red-500" />
                        {nextMatch?.obs} {nextMatch?.date} · {nextMatch?.time}
                      </span>
                    </div>

                    <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-5 mb-4">
                      <div className="flex items-center justify-between gap-3 text-center">
                        <div className="flex-1 flex flex-col items-center gap-2">
                          {nextMatch?.homeId === 't1' ? (
                            <LosTiosCrest className="w-14 h-14" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-black text-zinc-300 text-xs">
                              {getTeamPosition(nextMatch?.homeId)}º
                            </div>
                          )}
                          <div>
                            <p
                              className={`text-sm sm:text-base font-black ${
                                nextMatch?.homeId === 't1' ? 'text-red-400' : 'text-white'
                              }`}
                            >
                              {getTeamName(nextMatch?.homeId)}
                            </p>
                            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                              Local ({getTeamPosition(nextMatch?.homeId)}º)
                            </span>
                          </div>
                        </div>

                        <div className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 font-black text-sm text-zinc-300">
                          VS
                        </div>

                        <div className="flex-1 flex flex-col items-center gap-2">
                          {nextMatch?.awayId === 't1' ? (
                            <LosTiosCrest className="w-14 h-14" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-black text-zinc-300 text-xs">
                              {getTeamPosition(nextMatch?.awayId)}º
                            </div>
                          )}
                          <div>
                            <p
                              className={`text-sm sm:text-base font-black ${
                                nextMatch?.awayId === 't1' ? 'text-red-400' : 'text-white'
                              }`}
                            >
                              {getTeamName(nextMatch?.awayId)}
                            </p>
                            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                              Visitante ({getTeamPosition(nextMatch?.awayId)}º)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-center gap-1.5 text-xs text-zinc-300 text-center">
                        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{nextMatch?.venue}</span>
                      </div>
                    </div>

                    {/* Acceso destacado al Dossier del Próximo Rival */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/70 border border-red-500/30 rounded-2xl p-3.5 mb-4">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Crosshair className="w-4 h-4 text-red-500 shrink-0" />
                          <span>Scouting & Simulador · {getTeamName(nextRivalId)}</span>
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          Racha, rivales comunes, comparativa directa, estimación y tabla simulada
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDossierSection('overview');
                          setActiveTab('dossier');
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black tracking-wide shadow-lg shadow-red-600/25 transition-all shrink-0 cursor-pointer"
                      >
                        <Crosshair className="w-4 h-4" />
                        <span>ANALIZAR RIVAL · DOSSIER</span>
                      </button>
                    </div>

                    {/* Partidos disputados pulsables */}
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Partidos disputados (pulsa en uno para ver ficha e informe POSTPARTIDO)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {recentOurMatches.map((rm) => {
                          const isHome = rm.homeId === 't1';
                          const rivalName = isHome ? getTeamName(rm.awayId) : getTeamName(rm.homeId);
                          return (
                            <button
                              key={rm.id}
                              type="button"
                              onClick={() => setSelectedMatchModal(rm)}
                              className="text-left bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-red-500/60 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 text-xs transition-all cursor-pointer"
                            >
                              <div className="min-w-0">
                                <span className="text-[10px] text-zinc-500 block">
                                  J{rm.matchday} · {isHome ? 'Local' : 'Visitante'}
                                </span>
                                <span className="text-zinc-200 font-bold truncate block">
                                  {rivalName}
                                </span>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-black shrink-0">
                                {rm.homeGoals}-{rm.awayGoals}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-4 border-t border-zinc-800/80 text-xs">
                    <span className="text-zinc-400">Convocatoria y alineación interna en OnzeGol</span>
                    <a
                      href={settingsData.onzegolUrl}
                      onClick={handleOpenOnzegol}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-bold transition-all"
                    >
                      <span>Ver convocatoria en OnzeGol</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Mini-Clasificación IMD (Top 5) */}
                <div className="lg:col-span-5 bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-red-500" />
                        <h3 className="font-bold text-base text-white">Clasificación IMD (Top 5)</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('league')}
                        className="text-xs font-semibold text-red-400 hover:text-red-300"
                      >
                        Tabla completa →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-500">
                            <th className="py-2 pl-2">Pos</th>
                            <th className="py-2">Equipo</th>
                            <th className="py-2 text-center">PJ</th>
                            <th className="py-2 text-center">DG</th>
                            <th className="py-2 pr-2 text-right">Pts</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm">
                          {standings.slice(0, 5).map((team, idx) => (
                            <tr
                              key={team.id}
                              className={
                                team.isOurs
                                  ? 'bg-red-600/20 text-white font-bold'
                                  : 'text-zinc-300 hover:bg-zinc-900/50'
                              }
                            >
                              <td className="py-2.5 pl-2">
                                <span
                                  className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                                    team.isOurs
                                      ? 'bg-red-600 text-white'
                                      : 'bg-zinc-800/80 text-zinc-400'
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                              </td>
                              <td className="py-2.5 truncate max-w-[175px]">
                                <div className="flex items-center gap-2">
                                  {team.isOurs && <LosTiosCrest className="w-5 h-5" />}
                                  <span className="truncate">{team.name}</span>
                                </div>
                              </td>
                              <td className="py-2.5 text-center text-zinc-400">{team.pj}</td>
                              <td className="py-2.5 text-center text-zinc-400">
                                {team.dg > 0 ? `+${team.dg}` : team.dg}
                              </td>
                              <td className="py-2.5 pr-2 text-right font-black text-white">
                                {team.puntos}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <span>
                      MVP Jornada {latestPlayedMatchday}:{' '}
                      <strong className="text-amber-400">José (Portero)</strong>
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      Invictos ({ourRow?.pg}/{ourRow?.pj})
                    </span>
                  </div>
                </div>
              </div>

              {/* Líderes Estadísticos Reales */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    Líderes Estadísticos Reales · Plantilla
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('squad')}
                    className="text-xs font-semibold text-red-400 hover:text-red-300"
                  >
                    Ver los 12 jugadores →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Pichichi</span>
                      <Goal className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{realLeaders.maxGoals} Goles</p>
                      <p className="text-xs text-red-400 font-semibold mt-1">
                        {realLeaders.pichichis.map((p) => p.name).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Máx. Asistente</span>
                      <Footprints className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{realLeaders.maxAssists} Asist.</p>
                      <p className="text-xs text-red-400 font-semibold mt-1">
                        {realLeaders.topAssisters.map((p) => p.name).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Más MVP</span>
                      <Star className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{realLeaders.maxMvp} MVP</p>
                      <p className="text-xs text-amber-400 font-semibold mt-1">
                        {realLeaders.topMvps.map((p) => p.name).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Tarjetas</span>
                      <AlertTriangle className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">
                        {realLeaders.maxYellow} Amarilla
                      </p>
                      <p className="text-xs text-zinc-300 font-semibold mt-1">
                        {realLeaders.topYellow.map((p) => p.name).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => realLeaders.goalkeeper && setSelectedPlayerModal(realLeaders.goalkeeper)}
                    className="cursor-pointer bg-[#121215] hover:border-red-500/40 border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between transition-colors"
                  >
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Portería</span>
                      <Shield className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">
                        {realLeaders.goalkeeper?.conceded ?? 0} Enc.
                      </p>
                      <p className="text-xs text-zinc-300 font-semibold mt-1">
                        {realLeaders.goalkeeper?.name} ({realLeaders.goalkeeper?.pj ?? 0} PJ)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              2. DOSSIER DEL PRÓXIMO RIVAL
          ============================================================== */}
          {activeTab === 'dossier' && rivalRow && ourRow && (
            <div className="space-y-6">
              <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-red-600/20 text-red-400 border border-red-500/30">
                        DOSSIER DEL PARTIDO · JORNADA {nextMatch?.matchday ?? 4}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        PREPARTIDO
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      LOS TIOS FC vs {rivalRow.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {nextMatch?.obs} {nextMatch?.date} · {nextMatch?.time} · {nextMatch?.venue}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-3 text-center shrink-0">
                    <div>
                      <span className="text-[10px] uppercase text-zinc-500 block">Pos Rival</span>
                      <span className="text-base font-black text-white">{rivalRow.position}º</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-zinc-500 block">Puntos</span>
                      <span className="text-base font-black text-red-400">{rivalRow.puntos}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-zinc-500 block">TF : TC</span>
                      <span className="text-sm font-black text-zinc-200">
                        {rivalRow.tf}:{rivalRow.tc}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-zinc-500 block">Racha</span>
                      <span className="text-sm font-black text-emerald-400">
                        {computeStreakMetrics(rivalRow.form).currentLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-zinc-800/80">
                  {[
                    { id: 'overview', label: 'Rival y Evolución', icon: TrendingUp },
                    { id: 'common', label: 'Rivales Comunes', icon: Scale },
                    { id: 'compare', label: 'Comparativa Directa', icon: BarChart3 },
                    { id: 'profile', label: 'Perfil y Predicción', icon: Sparkles },
                    { id: 'simulator', label: 'Simulador Tabla', icon: Sliders },
                    { id: 'reports', label: 'Informes Pre/Post', icon: FileText },
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const active = dossierSection === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setDossierSection(tab.id)}
                        className={`w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-center leading-tight transition-all cursor-pointer ${
                          active
                            ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {dossierSection === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-6 bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                      Ficha General y Estado de Forma · {rivalRow.name}
                    </h4>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 text-center">
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-zinc-500 block">PJ</span>
                        <span className="text-base font-black text-white">{rivalRow.pj}</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-zinc-500 block">PG</span>
                        <span className="text-base font-black text-emerald-400">{rivalRow.pg}</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-zinc-500 block">PE</span>
                        <span className="text-base font-black text-zinc-300">{rivalRow.pe}</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-zinc-500 block">PP</span>
                        <span className="text-base font-black text-red-400">{rivalRow.pp}</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-zinc-500 block">DG</span>
                        <span className="text-base font-black text-white">
                          {rivalRow.dg > 0 ? `+${rivalRow.dg}` : rivalRow.dg}
                        </span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                        <span className="text-[10px] text-zinc-500 block">PTS</span>
                        <span className="text-base font-black text-red-400">{rivalRow.puntos}</span>
                      </div>
                    </div>

                    <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400 font-semibold">Últimos resultados</span>
                        <div className="flex items-center gap-1">
                          {(rivalRow.form || []).slice(-5).map((res, idx) => renderFormPill(res, idx))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/70 text-xs">
                        <div>
                          <span className="text-zinc-500 block">Media tantos a favor</span>
                          <span className="text-sm font-bold text-white">
                            {(rivalRow.tf / Math.max(1, rivalRow.pj)).toFixed(2)} TF/PJ
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block">Media tantos en contra</span>
                          <span className="text-sm font-bold text-zinc-300">
                            {(rivalRow.tc / Math.max(1, rivalRow.pj)).toFixed(2)} TC/PJ
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                        Historial de partidos disputados
                      </span>
                      {rivalPlayedHistory.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-zinc-950 border border-zinc-800/70 rounded-xl px-3 py-2 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="text-zinc-500 mr-1.5">J{item.matchday}</span>
                            <span className="font-bold text-zinc-200">
                              {item.isHome
                                ? `${rivalRow.name} vs ${item.rivalName}`
                                : `${item.rivalName} vs ${rivalRow.name}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-black text-white">
                              {item.homeGoals} - {item.awayGoals}
                            </span>
                            {renderFormPill(item.result, item.matchday)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                      Rendimiento Local / Visitante y Evolución
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-1">
                        <span className="text-[11px] font-bold uppercase text-zinc-400">
                          Como Local
                        </span>
                        <p className="text-lg font-black text-white">
                          {rivalRow.homeRecord.pts} pts{' '}
                          <span className="text-xs font-semibold text-zinc-400">
                            ({rivalRow.homeRecord.pj} PJ)
                          </span>
                        </p>
                        <p className="text-xs text-zinc-400">
                          {rivalRow.homeRecord.pg}PG · {rivalRow.homeRecord.pe}PE ·{' '}
                          {rivalRow.homeRecord.pp}PP · {rivalRow.homeRecord.tf} TF /{' '}
                          {rivalRow.homeRecord.tc} TC
                        </p>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-1">
                        <span className="text-[11px] font-bold uppercase text-zinc-400">
                          Como Visitante
                        </span>
                        <p className="text-lg font-black text-white">
                          {rivalRow.awayRecord.pts} pts{' '}
                          <span className="text-xs font-semibold text-zinc-400">
                            ({rivalRow.awayRecord.pj} PJ)
                          </span>
                        </p>
                        <p className="text-xs text-zinc-400">
                          {rivalRow.awayRecord.pg}PG · {rivalRow.awayRecord.pe}PE ·{' '}
                          {rivalRow.awayRecord.pp}PP · {rivalRow.awayRecord.tf} TF /{' '}
                          {rivalRow.awayRecord.tc} TC
                        </p>
                      </div>
                    </div>

                    <MatchdayEvolutionChart
                      matchdays={playedMatchdays}
                      metric={dossierChartMetric}
                      onChangeMetric={setDossierChartMetric}
                      title="Evolución jornada a jornada (reconstruida)"
                      subtitle={`Comparativa entre ${rivalRow.name} y LOS TIOS FC`}
                      seriesList={[
                        {
                          id: rivalRow.id,
                          label: rivalRow.name,
                          color: '#f59e0b',
                          highlight: true,
                          values: rivalHistorySeries.map((s) => s[dossierChartMetric]),
                        },
                        {
                          id: 't1',
                          label: 'LOS TIOS FC',
                          color: '#ef4444',
                          highlight: true,
                          values: ourHistorySeries.map((s) => s[dossierChartMetric]),
                        },
                      ]}
                    />
                  </div>
                </div>
              )}

              {dossierSection === 'common' && (
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        Rivales Comunes · LOS TIOS FC vs {rivalRow.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Equipos que ya se han enfrentado tanto a LOS TIOS FC como a {rivalRow.name}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 self-start sm:self-auto">
                      {commonOpponentsAnalysis.summary.count} rivales comunes
                    </span>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      Muestra reducida ({commonOpponentsAnalysis.summary.count}{' '}
                      {commonOpponentsAnalysis.summary.count === 1
                        ? 'rival común'
                        : 'rivales comunes'}
                      ). Un resultado aislado o en distinto escenario (local/visitante) no permite
                      conclusiones absolutas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-950 border border-red-500/30 rounded-xl p-4 space-y-1">
                      <span className="text-xs font-black text-red-400 uppercase">
                        LOS TIOS FC en rivales comunes
                      </span>
                      <p className="text-xl font-black text-white">
                        {commonOpponentsAnalysis.summary.ourPts} pts
                      </p>
                      <p className="text-xs text-zinc-400">
                        {commonOpponentsAnalysis.summary.ourW}PG ·{' '}
                        {commonOpponentsAnalysis.summary.ourD}PE ·{' '}
                        {commonOpponentsAnalysis.summary.ourL}PP ·{' '}
                        {commonOpponentsAnalysis.summary.ourGF} TF /{' '}
                        {commonOpponentsAnalysis.summary.ourGC} TC
                      </p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-1">
                      <span className="text-xs font-black text-amber-400 uppercase">
                        {rivalRow.name} en rivales comunes
                      </span>
                      <p className="text-xl font-black text-white">
                        {commonOpponentsAnalysis.summary.rivalPts} pts
                      </p>
                      <p className="text-xs text-zinc-400">
                        {commonOpponentsAnalysis.summary.rivalW}PG ·{' '}
                        {commonOpponentsAnalysis.summary.rivalD}PE ·{' '}
                        {commonOpponentsAnalysis.summary.rivalL}PP ·{' '}
                        {commonOpponentsAnalysis.summary.rivalGF} TF /{' '}
                        {commonOpponentsAnalysis.summary.rivalGC} TC
                      </p>
                    </div>
                  </div>

                  {commonOpponentsAnalysis.items.length === 0 ? (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-center text-xs text-zinc-400">
                      Todavía no hay rivales comunes disputados entre ambos equipos.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {commonOpponentsAnalysis.items.map((item) => (
                        <div
                          key={item.opponentId}
                          className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                              Rival común
                            </span>
                            <h5 className="text-base font-black text-white">{item.opponentName}</h5>
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-zinc-900 border border-zinc-700 text-zinc-200">
                              Mejor balance: {item.betterTeam}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:min-w-[420px] text-xs">
                            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
                              <span className="text-[10px] font-bold uppercase text-red-400 block">
                                LOS TIOS FC (J{item.ours.matchday} ·{' '}
                                {item.ours.isHome ? 'Local' : 'Visit.'})
                              </span>
                              <p className="text-sm font-black text-white mt-0.5">
                                {item.ours.homeGoals} - {item.ours.awayGoals} ({item.ours.pts} pts ·
                                DG {item.ourDiff > 0 ? `+${item.ourDiff}` : item.ourDiff})
                              </p>
                            </div>

                            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
                              <span className="text-[10px] font-bold uppercase text-amber-400 block">
                                {rivalRow.name} (J{item.rival.matchday} ·{' '}
                                {item.rival.isHome ? 'Local' : 'Visit.'})
                              </span>
                              <p className="text-sm font-black text-white mt-0.5">
                                {item.rival.homeGoals} - {item.rival.awayGoals} ({item.rival.pts}{' '}
                                pts · DG {item.rivalDiff > 0 ? `+${item.rivalDiff}` : item.rivalDiff})
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {dossierSection === 'compare' && (
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Comparativa Directa · LOS TIOS FC vs {rivalRow.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Se resalta en cada fila el registro numéricamente favorable en el indicador
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[540px]">
                      <thead>
                        <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-500">
                          <th className="py-3 pl-3">Indicador</th>
                          <th className="py-3 text-center text-red-400">LOS TIOS FC</th>
                          <th className="py-3 pr-3 text-center text-amber-400">{rivalRow.name}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/70 text-sm">
                        {[
                          {
                            label: 'Posición',
                            ourVal: `${ourRow.position}º`,
                            rivVal: `${rivalRow.position}º`,
                            winner:
                              ourRow.position < rivalRow.position
                                ? 'our'
                                : rivalRow.position < ourRow.position
                                ? 'riv'
                                : 'tie',
                          },
                          {
                            label: 'Puntos',
                            ourVal: ourRow.puntos,
                            rivVal: rivalRow.puntos,
                            winner:
                              ourRow.puntos > rivalRow.puntos
                                ? 'our'
                                : rivalRow.puntos > ourRow.puntos
                                ? 'riv'
                                : 'tie',
                          },
                          {
                            label: 'PG / PE / PP',
                            ourVal: `${ourRow.pg}PG · ${ourRow.pe}PE · ${ourRow.pp}PP`,
                            rivVal: `${rivalRow.pg}PG · ${rivalRow.pe}PE · ${rivalRow.pp}PP`,
                            winner:
                              ourRow.pg > rivalRow.pg
                                ? 'our'
                                : rivalRow.pg > ourRow.pg
                                ? 'riv'
                                : 'tie',
                          },
                          {
                            label: 'Tantos a favor (TF)',
                            ourVal: ourRow.tf,
                            rivVal: rivalRow.tf,
                            winner: ourRow.tf > rivalRow.tf ? 'our' : rivalRow.tf > ourRow.tf ? 'riv' : 'tie',
                          },
                          {
                            label: 'Tantos en contra (TC)',
                            ourVal: ourRow.tc,
                            rivVal: rivalRow.tc,
                            winner: ourRow.tc < rivalRow.tc ? 'our' : rivalRow.tc < ourRow.tc ? 'riv' : 'tie',
                          },
                          {
                            label: 'Diferencia de goles (DG)',
                            ourVal: ourRow.dg > 0 ? `+${ourRow.dg}` : ourRow.dg,
                            rivVal: rivalRow.dg > 0 ? `+${rivalRow.dg}` : rivalRow.dg,
                            winner: ourRow.dg > rivalRow.dg ? 'our' : rivalRow.dg > ourRow.dg ? 'riv' : 'tie',
                          },
                          {
                            label: 'Media goleadora (TF/PJ)',
                            ourVal: (ourRow.tf / Math.max(1, ourRow.pj)).toFixed(2),
                            rivVal: (rivalRow.tf / Math.max(1, rivalRow.pj)).toFixed(2),
                            winner:
                              ourRow.tf / Math.max(1, ourRow.pj) >
                              rivalRow.tf / Math.max(1, rivalRow.pj)
                                ? 'our'
                                : 'riv',
                          },
                          {
                            label: 'Rendimiento Local / Visitante',
                            ourVal: `L: ${ourRow.homeRecord.pts}p · V: ${ourRow.awayRecord.pts}p`,
                            rivVal: `L: ${rivalRow.homeRecord.pts}p · V: ${rivalRow.awayRecord.pts}p`,
                            winner: 'tie',
                          },
                          {
                            label: 'Racha actual',
                            ourVal: computeStreakMetrics(ourRow.form).currentLabel,
                            rivVal: computeStreakMetrics(rivalRow.form).currentLabel,
                            winner: 'tie',
                          },
                        ].map((row) => (
                          <tr key={row.label} className="hover:bg-zinc-900/40">
                            <td className="py-3 pl-3 font-semibold text-zinc-300">{row.label}</td>
                            <td
                              className={`py-3 text-center font-bold ${
                                row.winner === 'our'
                                  ? 'text-emerald-400 bg-emerald-500/10 rounded-lg'
                                  : 'text-zinc-200'
                              }`}
                            >
                              {row.ourVal}
                            </td>
                            <td
                              className={`py-3 pr-3 text-center font-bold ${
                                row.winner === 'riv'
                                  ? 'text-emerald-400 bg-emerald-500/10 rounded-lg'
                                  : 'text-zinc-200'
                              }`}
                            >
                              {row.rivVal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dossierSection === 'profile' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
                    <h4 className="text-base font-bold text-white">
                      Perfil Estadístico del Rival · {rivalRow.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Basado exclusivamente en datos oficiales de competición (sin datos
                      individuales de jugadores rivales).
                    </p>

                    <ul className="space-y-2.5 text-sm text-zinc-200">
                      {rivalProfile.traits.map((trait, idx) => (
                        <li
                          key={idx}
                          className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 flex items-start gap-2.5"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5">
                        <span className="text-xs font-black uppercase text-emerald-400 block mb-1.5">
                          Fortalezas en datos
                        </span>
                        <ul className="space-y-1 text-xs text-zinc-200">
                          {rivalProfile.strengths.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-3.5">
                        <span className="text-xs font-black uppercase text-red-400 block mb-1.5">
                          Aspectos a vigilar
                        </span>
                        <ul className="space-y-1 text-xs text-zinc-200">
                          {rivalProfile.weaknesses.map((w, i) => (
                            <li key={i}>• {w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">Estimación Estadística</h4>
                      <span className="text-[11px] font-bold text-zinc-400">
                        Archivada ({statisticalForecast.generatedAt})
                      </span>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{statisticalForecast.sampleNotice}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="bg-zinc-950 border border-emerald-500/30 rounded-xl p-3">
                        <span className="text-[10px] uppercase text-zinc-400 block">
                          Victoria LOS TIOS
                        </span>
                        <span className="text-2xl font-black text-emerald-400">
                          {statisticalForecast.probabilities.win}%
                        </span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
                        <span className="text-[10px] uppercase text-zinc-400 block">Empate</span>
                        <span className="text-2xl font-black text-zinc-200">
                          {statisticalForecast.probabilities.draw}%
                        </span>
                      </div>
                      <div className="bg-zinc-950 border border-red-500/30 rounded-xl p-3">
                        <span className="text-[10px] uppercase text-zinc-400 block">
                          Victoria Rival
                        </span>
                        <span className="text-2xl font-black text-red-400">
                          {statisticalForecast.probabilities.loss}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold uppercase text-zinc-400 block">
                        Goles Esperados (xG orientativo)
                      </span>
                      <div className="flex items-center justify-between text-sm font-black">
                        <span className="text-white">
                          {getTeamName(nextMatch?.homeId)}:{' '}
                          <span className="text-red-400">
                            {statisticalForecast.expectedGoals.home}
                          </span>
                        </span>
                        <span className="text-white">
                          {getTeamName(nextMatch?.awayId)}:{' '}
                          <span className="text-amber-400">
                            {statisticalForecast.expectedGoals.away}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 pt-1">
                        {statisticalForecast.keyContext}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {dossierSection === 'simulator' && simulationResult && (
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-5">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Simulador de Clasificación · Jornada {nextMatch?.matchday ?? 4}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Simula el marcador de LOS TIOS FC vs {rivalRow.name} y revisa su efecto en
                      puntos, DG y posición
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'WIN', label: 'Victoria LOS TIOS FC' },
                      { id: 'DRAW', label: 'Empate' },
                      { id: 'LOSS', label: 'Derrota LOS TIOS FC' },
                      { id: 'CUSTOM', label: 'Marcador personalizado' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSimScenario(opt.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          simScenario === opt.id
                            ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20'
                            : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {simScenario === 'CUSTOM' && (
                    <div className="flex flex-wrap items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs">
                      <label className="flex items-center gap-2 font-bold text-red-400">
                        <span>LOS TIOS FC</span>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={customOurGoals}
                          onChange={(e) => setCustomOurGoals(e.target.value)}
                          className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-white font-black text-center"
                        />
                      </label>
                      <span className="font-black text-zinc-500">-</span>
                      <label className="flex items-center gap-2 font-bold text-amber-400">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={customRivalGoals}
                          onChange={(e) => setCustomRivalGoals(e.target.value)}
                          className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-white font-black text-center"
                        />
                        <span>{rivalRow.name}</span>
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                      <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                        Puntos Proyectados LOS TIOS FC
                      </span>
                      <p className="text-2xl font-black text-white mt-1">
                        {simulationResult.projectedOurs?.puntos} pts{' '}
                        <span className="text-xs font-bold text-emerald-400">
                          ({simulationResult.deltaPts >= 0 ? `+${simulationResult.deltaPts}` : simulationResult.deltaPts})
                        </span>
                      </p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                      <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                        Posición Proyectada
                      </span>
                      <p className="text-2xl font-black text-red-400 mt-1">
                        {simulationResult.projectedOurs?.position}º
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {simulationResult.isExactPosition
                          ? 'Posición exacta (jornada cerrada)'
                          : `Posición orientativa (${simulationResult.pendingOtherCount} de ${simulationResult.totalOtherCount} partidos restantes de J${nextMatch?.matchday ?? 4} pendientes)`}
                      </p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                      <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                        Diferencia de Goles (DG)
                      </span>
                      <p className="text-2xl font-black text-white mt-1">
                        {(simulationResult.projectedOurs?.dg ?? 0) > 0
                          ? `+${simulationResult.projectedOurs?.dg}`
                          : simulationResult.projectedOurs?.dg}{' '}
                        <span className="text-xs font-semibold text-zinc-400">
                          (Simulado: {simulationResult.ourGoals}-{simulationResult.rivalGoals})
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[540px]">
                      <thead>
                        <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-500">
                          <th className="py-2.5 pl-3">Pos</th>
                          <th className="py-2.5">Equipo</th>
                          <th className="py-2.5 text-center">PJ</th>
                          <th className="py-2.5 text-center">DG</th>
                          <th className="py-2.5 pr-3 text-right">Puntos</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-sm">
                        {simulationResult.projectedTable.map((t) => (
                          <tr
                            key={t.id}
                            className={
                              t.isOurs
                                ? 'bg-red-600/20 text-white font-bold'
                                : t.id === nextRivalId
                                ? 'bg-amber-500/10 text-amber-200'
                                : 'text-zinc-300'
                            }
                          >
                            <td className="py-2.5 pl-3 font-black">{t.position}º</td>
                            <td className="py-2.5 font-semibold">{t.name}</td>
                            <td className="py-2.5 text-center text-zinc-400">{t.pj}</td>
                            <td className="py-2.5 text-center">
                              {t.dg > 0 ? `+${t.dg}` : t.dg}
                            </td>
                            <td className="py-2.5 pr-3 text-right font-black text-white">
                              {t.puntos}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dossierSection === 'reports' && (
                <div className="space-y-4">
                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Archivo Histórico de Informes PREPARTIDO y POSTPARTIDO
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Cada informe está vinculado al identificador estable del partido. Las previas
                      guardadas se conservan al registrar el informe posterior.
                    </p>
                  </div>

                  {Object.values(preMatchReportsData)
                    .sort((a, b) => b.matchday - a.matchday)
                    .map((pre) => {
                      const post = postMatchReportsData[pre.matchId];
                      const matchObj = matchesData.find((m) => m.id === pre.matchId);
                      return (
                        <div
                          key={pre.matchId}
                          className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                            <div>
                              <span className="text-[11px] font-black uppercase text-red-400 block">
                                ID: {pre.matchId} · Jornada {pre.matchday}
                              </span>
                              <h5 className="text-base font-black text-white">
                                LOS TIOS FC vs {pre.rivalName}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-900 border border-zinc-700 text-zinc-200">
                                PREPARTIDO ({pre.generatedAt})
                              </span>
                              {post && (
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                                  POSTPARTIDO ({post.recordedAt})
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-4 space-y-2">
                              <span className="font-black uppercase text-zinc-300 block">
                                1. Informe PREPARTIDO (Archivado)
                              </span>
                              <p className="text-zinc-400">
                                Rival antes del encuentro:{' '}
                                <strong className="text-white">
                                  {pre.rivalPosBefore ? `${pre.rivalPosBefore}º` : 'Sin pos.'} ·{' '}
                                  {pre.rivalPtsBefore} pts
                                </strong>
                              </p>
                              <p className="text-zinc-400">
                                Probabilidades previas:{' '}
                                <strong className="text-emerald-400">
                                  V {pre.probabilities.win}%
                                </strong>{' '}
                                /{' '}
                                <strong className="text-zinc-200">
                                  E {pre.probabilities.draw}%
                                </strong>{' '}
                                /{' '}
                                <strong className="text-red-400">
                                  D {pre.probabilities.loss}%
                                </strong>
                              </p>
                              <p className="text-zinc-400">
                                xG estimados:{' '}
                                <strong className="text-white">
                                  {pre.expectedGoals.home} - {pre.expectedGoals.away}
                                </strong>
                              </p>
                              <p className="text-zinc-400">{pre.keyContext}</p>
                            </div>

                            <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-4 space-y-2">
                              <span className="font-black uppercase text-emerald-400 block">
                                2. Informe POSTPARTIDO
                              </span>
                              {post ? (
                                <>
                                  <p className="text-zinc-300 font-bold">
                                    Marcador definitivo:{' '}
                                    <span className="text-white text-sm">
                                      {getTeamName(matchObj?.homeId)} {post.finalScore.home} -{' '}
                                      {post.finalScore.away} {getTeamName(matchObj?.awayId)}
                                    </span>
                                  </p>
                                  <p className="text-zinc-400">
                                    Goles reales combinados:{' '}
                                    <strong className="text-white">
                                      {post.finalScore.home + post.finalScore.away}
                                    </strong>{' '}
                                    frente a{' '}
                                    <strong className="text-zinc-200">
                                      {(pre.expectedGoals.home + pre.expectedGoals.away).toFixed(1)}{' '}
                                      xG previos
                                    </strong>
                                    .
                                  </p>
                                  <p className="text-zinc-400">
                                    Consecuencia clasificatoria:{' '}
                                    <strong className="text-zinc-200">
                                      {post.standingsConsequence}
                                    </strong>
                                  </p>
                                  <p className="text-zinc-200 bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5">
                                    {post.automaticConclusion}
                                  </p>
                                </>
                              ) : (
                                <p className="text-zinc-500">
                                  Partido aún no disputado. Al actualizar su resultado se habilitará
                                  aquí el informe posterior manteniendo intacta la previa.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* ==============================================================
              3. LIGA IMD
          ============================================================== */}
          {activeTab === 'league' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121215] border border-zinc-800/90 rounded-2xl p-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Liga IMD Sevilla · Competición</h3>
                  <p className="text-xs text-zinc-400">
                    Calendario oficial de 14 jornadas, clasificación y seguimiento global
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setLeagueSection('fixtures')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      leagueSection === 'fixtures'
                        ? 'bg-red-600 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Jornadas y Tabla
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeagueSection('global')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      leagueSection === 'global'
                        ? 'bg-red-600 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Seguimiento Global
                  </button>
                </div>
              </div>

              {leagueSection === 'fixtures' && (
                <>
                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          Calendario y Resultados · IMD Sevilla
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Pulsa sobre cualquier partido de LOS TIOS FC para ver su ficha
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOnlyOurMatches(!onlyOurMatches)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all self-start lg:self-auto ${
                          onlyOurMatches
                            ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/25'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-red-500/50'
                        }`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        {onlyOurMatches
                          ? 'Mostrando: Solo LOS TIOS FC (14)'
                          : 'Filtrar: Solo LOS TIOS FC'}
                      </button>
                    </div>

                    {!onlyOurMatches && (
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-zinc-800/80">
                        {Array.from({ length: settingsData.totalMatchdays }, (_, i) => i + 1).map(
                          (md) => {
                            const isDisputed = playedMatchdays.includes(md);
                            return (
                              <button
                                key={md}
                                type="button"
                                onClick={() => setSelectedMatchday(md)}
                                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                                  selectedMatchday === md
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                                }`}
                              >
                                <span>J{md}</span>
                                {isDisputed && (
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      selectedMatchday === md ? 'bg-white' : 'bg-emerald-400'
                                    }`}
                                  />
                                )}
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {visibleMatches.map((m) => {
                        const isOurMatch = m.homeId === 't1' || m.awayId === 't1';
                        const hasStats = Boolean(playerMatchStatsData[m.id]);
                        return (
                          <div
                            key={m.id}
                            onClick={() => isOurMatch && setSelectedMatchModal(m)}
                            className={`rounded-xl p-4 border transition-all ${
                              isOurMatch
                                ? 'bg-red-950/20 border-red-500/40 hover:border-red-500 cursor-pointer'
                                : 'bg-zinc-950/85 border-zinc-800/80'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2.5 gap-2">
                              <span className="font-semibold text-zinc-300">
                                {onlyOurMatches ? `J${m.matchday} · ` : ''}
                                {m.obs} {m.date} · {m.time}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {isOurMatch && (
                                  <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/30 text-[10px] font-bold text-red-300">
                                    {hasStats ? 'Ver ficha ↗' : 'Pendiente'}
                                  </span>
                                )}
                                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400">
                                  {m.played ? 'Definitivo' : 'Programado'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 my-2">
                              <span
                                className={`flex-1 text-xs sm:text-sm font-semibold truncate ${
                                  m.homeId === 't1' ? 'text-red-400 font-black' : 'text-zinc-200'
                                }`}
                              >
                                {getTeamName(m.homeId)}
                              </span>

                              <div
                                className={`px-3 py-1 rounded-lg border font-black text-sm min-w-[70px] text-center ${
                                  m.played
                                    ? 'bg-zinc-900 border-zinc-700 text-white'
                                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                                }`}
                              >
                                {m.played ? `${m.homeGoals} - ${m.awayGoals}` : 'VS'}
                              </div>

                              <span
                                className={`flex-1 text-xs sm:text-sm font-semibold text-right truncate ${
                                  m.awayId === 't1' ? 'text-red-400 font-black' : 'text-zinc-200'
                                }`}
                              >
                                {getTeamName(m.awayId)}
                              </span>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] text-zinc-500">
                              <MapPin className="w-3.5 h-3.5 text-red-500/80 shrink-0" />
                              <span className="truncate">{m.venue}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tabla Clasificatoria Completa */}
                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          Tabla Clasificatoria Oficial IMD
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Reconstruida automáticamente a partir de los resultados disputados
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                        Jornada N.º {latestPlayedMatchday} · Resultados Definitivos
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[740px]">
                        <thead>
                          <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-500">
                            <th className="py-3 pl-3">Pos</th>
                            <th className="py-3">Equipo</th>
                            <th className="py-3 text-center">PJ</th>
                            <th className="py-3 text-center">PG</th>
                            <th className="py-3 text-center">PE</th>
                            <th className="py-3 text-center">PP</th>
                            <th className="py-3 text-center">PNP</th>
                            <th className="py-3 text-center">TF</th>
                            <th className="py-3 text-center">TC</th>
                            <th className="py-3 text-center">DG</th>
                            <th className="py-3 pr-3 text-right">Puntos</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm">
                          {standings.map((team, index) => (
                            <tr
                              key={team.id}
                              className={
                                team.isOurs
                                  ? 'bg-red-600/20 text-white font-bold'
                                  : 'text-zinc-300 hover:bg-zinc-900/50'
                              }
                            >
                              <td className="py-3 pl-3">
                                <span
                                  className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                                    team.isOurs
                                      ? 'bg-red-600 text-white'
                                      : 'bg-zinc-800 text-zinc-400'
                                  }`}
                                >
                                  {index + 1}
                                </span>
                              </td>
                              <td className="py-3 font-medium">
                                <div className="flex items-center gap-2.5">
                                  {team.isOurs && <LosTiosCrest className="w-6 h-6" />}
                                  <span>{team.name}</span>
                                </div>
                              </td>
                              <td className="py-3 text-center">{team.pj}</td>
                              <td className="py-3 text-center text-emerald-400 font-semibold">
                                {team.pg}
                              </td>
                              <td className="py-3 text-center text-zinc-400">{team.pe}</td>
                              <td className="py-3 text-center text-red-400">{team.pp}</td>
                              <td className="py-3 text-center text-zinc-500">{team.pnp}</td>
                              <td className="py-3 text-center font-medium">{team.tf}</td>
                              <td className="py-3 text-center text-zinc-400">{team.tc}</td>
                              <td className="py-3 text-center font-semibold">
                                {team.dg > 0 ? `+${team.dg}` : team.dg}
                              </td>
                              <td className="py-3 pr-3 text-right font-black text-base text-white">
                                {team.puntos}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {leagueSection === 'global' && (
                <div className="space-y-6">
                  <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          Evolución Histórica por Equipo
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Compara la trayectoria jornada a jornada de cualquier equipo frente a LOS
                          TIOS FC
                        </p>
                      </div>

                      <select
                        value={selectedTeamEvolutionId}
                        onChange={(e) => setSelectedTeamEvolutionId(e.target.value)}
                        className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-500"
                      >
                        {teamsData
                          .filter((t) => t.id !== 't1')
                          .map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <MatchdayEvolutionChart
                      matchdays={playedMatchdays}
                      metric={leagueChartMetric}
                      onChangeMetric={setLeagueChartMetric}
                      title="Seguimiento Global por Jornada"
                      subtitle="Posición (1º arriba), puntos acumulados, tantos a favor o en contra"
                      seriesList={[
                        {
                          id: 't1',
                          label: 'LOS TIOS FC',
                          color: '#ef4444',
                          highlight: true,
                          values: buildTeamHistorySeries('t1').map(
                            (s) => s[leagueChartMetric]
                          ),
                        },
                        {
                          id: selectedTeamEvolutionId,
                          label: getTeamName(selectedTeamEvolutionId),
                          color: '#38bdf8',
                          highlight: true,
                          values: buildTeamHistorySeries(selectedTeamEvolutionId).map(
                            (s) => s[leagueChartMetric]
                          ),
                        },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
                      <h5 className="text-xs font-black uppercase text-red-400">
                        Equipos más goleadores (TF)
                      </h5>
                      {leagueGlobalMetrics.topScorers.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">
                            {i + 1}. {t.name}
                          </span>
                          <span className="font-black text-white">{t.tf} TF</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
                      <h5 className="text-xs font-black uppercase text-emerald-400">
                        Menos tantos encajados (TC)
                      </h5>
                      {leagueGlobalMetrics.bestDefenses.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">
                            {i + 1}. {t.name}
                          </span>
                          <span className="font-black text-emerald-300">{t.tc} TC</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
                      <h5 className="text-xs font-black uppercase text-amber-400">
                        Mejores rachas de victorias
                      </h5>
                      {leagueGlobalMetrics.bestStreaks.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">
                            {i + 1}. {t.name}
                          </span>
                          <span className="font-black text-amber-300">
                            {t.streak.maxWinStreak}V seguidas
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
                      <h5 className="text-xs font-black uppercase text-zinc-400">
                        Mayores rachas de derrotas
                      </h5>
                      {leagueGlobalMetrics.worstStreaks.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">
                            {i + 1}. {t.name}
                          </span>
                          <span className="font-black text-red-400">
                            {t.streak.maxLossStreak}D seguidas
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
                      <h5 className="text-xs font-black uppercase text-sky-400">
                        Mayor subida de posiciones
                      </h5>
                      {leagueGlobalMetrics.biggestClimbers.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">
                            {i + 1}. {t.name} ({t.startPos}º→{t.endPos}º)
                          </span>
                          <span className="inline-flex items-center gap-1 font-black text-sky-300">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {t.posChange >= 0 ? `+${t.posChange}` : t.posChange}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
                      <h5 className="text-xs font-black uppercase text-zinc-400">
                        Mayor caída de posiciones
                      </h5>
                      {leagueGlobalMetrics.biggestFallers.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">
                            {i + 1}. {t.name} ({t.startPos}º→{t.endPos}º)
                          </span>
                          <span className="inline-flex items-center gap-1 font-black text-red-400">
                            {t.posChange < 0 ? (
                              <TrendingDown className="w-3.5 h-3.5" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                            {t.posChange > 0 ? `+${t.posChange}` : t.posChange}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==============================================================
              4. PLANTILLA & ESTADÍSTICAS REALES
          ============================================================== */}
          {activeTab === 'squad' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                    Goles a Favor
                  </span>
                  <span className="text-2xl font-black text-white mt-1 block">
                    {squadTotals.goals}
                  </span>
                </div>
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                    Goles Encajados
                  </span>
                  <span className="text-2xl font-black text-red-400 mt-1 block">
                    {squadTotals.conceded}
                  </span>
                </div>
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                    Asistencias
                  </span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">
                    {squadTotals.assists}
                  </span>
                </div>
                <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                    Premios MVP
                  </span>
                  <span className="text-2xl font-black text-amber-400 mt-1 block">
                    {squadTotals.mvp}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-[#121215] border border-zinc-800/90 rounded-2xl p-4">
                  <span className="text-[11px] font-bold uppercase text-zinc-500 block">
                    Amarillas
                  </span>
                  <span className="text-2xl font-black text-amber-300 mt-1 block">
                    {squadTotals.yellowCards}
                  </span>
                </div>
              </div>

              <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar jugador de la plantilla (12)..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero'].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setRoleFilter(pos)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        roleFilter === pos
                          ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[720px]">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-400 bg-zinc-950/50">
                        <th className="py-3.5 pl-4">Jugador</th>
                        <th className="py-3.5">Posición</th>
                        <th
                          onClick={() => handleSort('pj')}
                          className="py-3.5 text-center cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            PJ <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('goals')}
                          className="py-3.5 text-center cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            Goles <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('assists')}
                          className="py-3.5 text-center cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            Asist. <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('ga')}
                          className="py-3.5 text-center cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            G+A <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('mvp')}
                          className="py-3.5 text-center cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            MVP <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('yellowCards')}
                          className="py-3.5 text-center cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            Tarj. <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('conceded')}
                          className="py-3.5 pr-4 text-right cursor-pointer hover:text-red-400 select-none"
                        >
                          <span className="inline-flex items-center justify-end gap-1">
                            Enc. <ArrowUpDown className="w-3 h-3" />
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-sm">
                      {filteredAndSortedPlayers.map((player) => (
                        <tr
                          key={player.id}
                          onClick={() => setSelectedPlayerModal(player)}
                          className="hover:bg-zinc-900/80 cursor-pointer transition-colors"
                        >
                          <td className="py-3.5 pl-4">
                            <p className="font-bold text-white">{player.name}</p>
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getRoleBadgeStyle(
                                player.role
                              )}`}
                            >
                              {player.role}
                            </span>
                          </td>
                          <td className="py-3.5 text-center font-semibold text-zinc-300">
                            {player.pj}
                          </td>
                          <td className="py-3.5 text-center font-black text-white">
                            {player.goals}
                          </td>
                          <td className="py-3.5 text-center text-zinc-300">{player.assists}</td>
                          <td className="py-3.5 text-center font-bold text-emerald-400">
                            {player.goals + player.assists}
                          </td>
                          <td className="py-3.5 text-center">
                            {player.mvp > 0 ? (
                              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold text-xs">
                                ★ {player.mvp}
                              </span>
                            ) : (
                              <span className="text-zinc-600">0</span>
                            )}
                          </td>
                          <td className="py-3.5 text-center">
                            {player.yellowCards > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-xs">
                                🟨 {player.yellowCards}
                              </span>
                            ) : (
                              <span className="text-zinc-600">–</span>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 text-right font-semibold text-zinc-300">
                            {player.conceded > 0 ? player.conceded : '–'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              5. SOCIAL (INSTAGRAM OFICIAL DEL EQUIPO)
          ============================================================== */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              {/* 1. Cabecera del perfil oficial */}
              <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
                  <div className="flex items-center gap-4 min-w-0">
                    <LosTiosCrest className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_14px_rgba(220,38,38,0.35)]" />
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600/15 text-red-400 border border-red-500/30 mb-1.5">
                        <Instagram className="w-3.5 h-3.5" />
                        Cuenta Oficial del Club
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white truncate">
                        {settingsData.displayName}
                      </h3>
                      <p className="text-sm font-bold text-red-400 mt-0.5">
                        {settingsData.instagramHandle}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Crónicas, goles, momentos de vestuario y actualidad del equipo
                      </p>
                    </div>
                  </div>

                  <a
                    href={settingsData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-red-600/30 transition-all shrink-0"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Seguir en Instagram</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 2. Sección superior destacada a ancho completo: Última Publicación */}
              <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <h4 className="text-base sm:text-lg font-black text-white">
                      Última Publicación
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600/15 text-red-400 border border-red-500/30">
                    Reel Destacado
                  </span>
                </div>

                <InstagramEmbedCard permalink={instagramLatestPost} featured />
              </div>

              {/* 3. Cuadrícula inferior: Galería del Equipo */}
              <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      Galería del Equipo
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Publicaciones y momentos destacados de {settingsData.instagramHandle}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300">
                    {instagramGalleryPosts.length} publicaciones
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {instagramGalleryPosts.map((postUrl, index) => (
                    <InstagramEmbedCard key={`ig-gallery-${index}`} permalink={postUrl} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ====================================================================
          BARRA INFERIOR MÓVIL
      ==================================================================== */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#121215]/95 backdrop-blur-xl border-t border-zinc-800/90 z-30 px-1.5 py-1.5">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-semibold transition-all ${
                  active ? 'text-red-500 bg-red-500/10' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? 'text-red-500' : 'text-zinc-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ====================================================================
          MODAL FICHA DE PARTIDO (ORDEN ESTRICTO SOLICITADO)
      ==================================================================== */}
      {selectedMatchModal && (
        <div
          onClick={() => setSelectedMatchModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121215] border border-zinc-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600/15 text-red-400 border border-red-500/30 mb-1.5">
                  Jornada {selectedMatchModal.matchday} · {selectedMatchModal.obs}{' '}
                  {selectedMatchModal.date} ({selectedMatchModal.time})
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {getTeamName(selectedMatchModal.homeId)}{' '}
                  <span className="text-red-500 mx-1">
                    {selectedMatchModal.played
                      ? `${selectedMatchModal.homeGoals} - ${selectedMatchModal.awayGoals}`
                      : 'VS'}
                  </span>{' '}
                  {getTeamName(selectedMatchModal.awayId)}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">{selectedMatchModal.venue}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMatchModal(null)}
                className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {postMatchReportsData[selectedMatchModal.id] && (
              <div className="bg-zinc-950 border border-emerald-500/30 rounded-xl p-3.5 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-black uppercase text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Informe POSTPARTIDO</span>
                </div>
                <p className="text-zinc-200">
                  {postMatchReportsData[selectedMatchModal.id].automaticConclusion}
                </p>
              </div>
            )}

            {playerMatchStatsData[selectedMatchModal.id] ? (
              <div className="space-y-3">
                {(() => {
                  const rawEntries = playerMatchStatsData[selectedMatchModal.id]
                    .map((entry) => {
                      const pl = playersData.find((p) => p.id === entry.playerId);
                      return pl ? { ...entry, player: pl } : null;
                    })
                    .filter(Boolean);

                  // 1. MVP primero
                  const mvpList = rawEntries.filter((item) => item.mvp);
                  const afterMvp = rawEntries.filter((item) => !item.mvp);

                  // 2. Resto que hayan marcado (priorizando quien marca y da asistencia)
                  const scorersList = afterMvp
                    .filter((item) => item.goals > 0)
                    .sort((a, b) => {
                      if (b.goals !== a.goals) return b.goals - a.goals;
                      return b.assists - a.assists;
                    });

                  // 3. Asistentes sin gol
                  const assistersList = afterMvp
                    .filter((item) => item.goals === 0 && item.assists > 0)
                    .sort((a, b) => b.assists - a.assists);

                  // 4. Jugadores con amarilla sin MVP/gol/asistencia
                  const yellowList = afterMvp.filter(
                    (item) => item.goals === 0 && item.assists === 0 && item.yellow > 0
                  );

                  // 5. Resto de convocatoria (portero primero si no fue MVP)
                  const squadRestList = afterMvp
                    .filter(
                      (item) => item.goals === 0 && item.assists === 0 && item.yellow === 0
                    )
                    .sort((a, b) => {
                      const aGk = a.player.role === 'Portero' ? 0 : 1;
                      const bGk = b.player.role === 'Portero' ? 0 : 1;
                      return aGk - bGk;
                    });

                  const renderStatRow = (item) => {
                    const pl = item.player;
                    return (
                      <div
                        key={item.playerId}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white truncate">{pl.name}</span>
                            {item.mvp && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black">
                                ★ MVP
                              </span>
                            )}
                          </div>
                          <span
                            className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold border ${getRoleBadgeStyle(
                              pl.role
                            )}`}
                          >
                            {pl.role}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
                          {item.goals > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                              ⚽ {item.goals > 1 ? `×${item.goals}` : 'Gol'}
                            </span>
                          )}
                          {item.assists > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold">
                              <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-black inline-flex items-center justify-center">
                                A
                              </span>
                              {item.assists > 1 ? `×${item.assists}` : 'Asist.'}
                            </span>
                          )}
                          {item.yellow > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
                              🟨 Amarilla
                            </span>
                          )}
                          {item.saves > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold">
                              🧤 {item.saves} paradas
                            </span>
                          )}
                          {!item.goals && !item.assists && !item.yellow && !item.saves && (
                            <span className="text-[11px] text-zinc-500">Jugado</span>
                          )}
                        </div>
                      </div>
                    );
                  };

                  const highlightList = [...mvpList, ...scorersList, ...assistersList, ...yellowList];

                  return (
                    <>
                      <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                        <span className="font-bold uppercase tracking-wider">
                          Destacados y Convocatoria
                        </span>
                        <span>{rawEntries.length} jugadores</span>
                      </div>

                      {highlightList.length > 0 && (
                        <div className="divide-y divide-zinc-800/70 bg-zinc-950/90 border border-zinc-800/80 rounded-xl px-3.5">
                          {highlightList.map(renderStatRow)}
                        </div>
                      )}

                      {squadRestList.length > 0 && (
                        <div className="pt-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                              Resto de convocatoria
                            </span>
                            <div className="flex-1 h-px bg-zinc-800" />
                          </div>
                          <div className="divide-y divide-zinc-800/70 bg-zinc-950/70 border border-zinc-800/70 rounded-xl px-3.5">
                            {squadRestList.map(renderStatRow)}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-center space-y-2">
                <p className="text-sm font-semibold text-zinc-300">
                  Partido pendiente de disputar
                </p>
                <p className="text-xs text-zinc-500">
                  Cuando se dispute este partido aparecerán aquí los goles, asistencias y amarillas.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL DETALLE DE JUGADOR
      ==================================================================== */}
      {selectedPlayerModal && (
        <div
          onClick={() => setSelectedPlayerModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121215] border border-zinc-800 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">{selectedPlayerModal.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRoleBadgeStyle(
                      selectedPlayerModal.role
                    )}`}
                  >
                    {selectedPlayerModal.role}
                  </span>
                  <span className="text-xs text-zinc-400">{settingsData.displayName}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlayerModal(null)}
                className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
                <span className="block text-[10px] uppercase text-zinc-500">Partidos (PJ)</span>
                <span className="text-lg font-black text-white">{selectedPlayerModal.pj}</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
                <span className="block text-[10px] uppercase text-zinc-500">Goles</span>
                <span className="text-lg font-black text-white">{selectedPlayerModal.goals}</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
                <span className="block text-[10px] uppercase text-zinc-500">Asistencias</span>
                <span className="text-lg font-black text-white">{selectedPlayerModal.assists}</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
                <span className="block text-[10px] uppercase text-zinc-500">Total G+A</span>
                <span className="text-lg font-black text-emerald-400">
                  {selectedPlayerModal.goals + selectedPlayerModal.assists}
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
                <span className="block text-[10px] uppercase text-zinc-500">Premios MVP</span>
                <span className="text-lg font-black text-amber-400">{selectedPlayerModal.mvp}</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
                <span className="block text-[10px] uppercase text-zinc-500">
                  {selectedPlayerModal.role === 'Portero' ? 'Goles Enc.' : 'Tarj. Amarillas'}
                </span>
                <span className="text-lg font-black text-zinc-200">
                  {selectedPlayerModal.role === 'Portero'
                    ? selectedPlayerModal.conceded
                    : selectedPlayerModal.yellowCards}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Actuaciones por partido
              </p>
              <div className="space-y-1.5">
                {['j1-iss-tios', 'j2-tios-goat', 'j3-triana-tios'].map((mId) => {
                  const matchObj = matchesData.find((m) => m.id === mId);
                  const stat = playerMatchStatsData[mId]?.find(
                    (s) => s.playerId === selectedPlayerModal.id
                  );
                  if (!matchObj) return null;
                  const rival =
                    matchObj.homeId === 't1'
                      ? getTeamName(matchObj.awayId)
                      : getTeamName(matchObj.homeId);

                  return (
                    <div
                      key={mId}
                      className="bg-zinc-950 border border-zinc-800/80 rounded-xl px-3 py-2 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] text-zinc-500 block">
                          Jornada {matchObj.matchday} ({matchObj.homeGoals}-{matchObj.awayGoals})
                        </span>
                        <span className="text-zinc-200 font-semibold truncate block">vs {rival}</span>
                      </div>

                      {stat ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {stat.mvp && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                              ★ MVP
                            </span>
                          )}
                          {stat.goals > 0 && <span>⚽</span>}
                          {stat.assists > 0 && (
                            <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-black inline-flex items-center justify-center">
                              A
                            </span>
                          )}
                          {stat.yellow > 0 && <span>🟨</span>}
                          {stat.saves > 0 && (
                            <span className="text-[11px] text-zinc-400">🧤{stat.saves}</span>
                          )}
                          {!stat.mvp &&
                            !stat.goals &&
                            !stat.assists &&
                            !stat.yellow &&
                            !stat.saves && <span className="text-zinc-500 text-[11px]">Jugó</span>}
                        </div>
                      ) : (
                        <span className="text-zinc-600 text-[11px] shrink-0">No convocado</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}