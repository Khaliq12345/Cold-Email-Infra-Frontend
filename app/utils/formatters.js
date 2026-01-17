/**
 * Formatage des valeurs numériques
 */
export function formatValue(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return `${Math.round(num)}`;
}

/**
 * Formatage des pourcentages
 */
export function formatPercentage(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return `${num.toFixed(1)}%`;
}

/**
 * Formatage des nombres (avec séparateurs de milliers)
 */
export function formatNumber(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseInt(value);
  if (isNaN(num)) return value;
  return `${num.toLocaleString()}`;
}

/**
 * Détermine la couleur selon le score de santé
 */
export function getHealthColor(value) {
  if (value === undefined || value === null) return "neutral";
  
  const num = parseFloat(value);
  if (isNaN(num)) return "neutral";

  if (num >= 90) return "success";
  if (num >= 70) return "warning";
  return "error";
}

/**
 * Formatage des dates pour les graphiques
 */
export function dateFormatter(value, options = {}) {
  const date = new Date(value);
  const defaultOptions = {
    day: "2-digit",
    month: "short",
  };
  
  return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
}

/**
 * Formatage des nombres pour les graphiques
 */
export function numberFormatter(value) {
  return value.toLocaleString();
}

/**
 * Conversion en booléen avec gestion des chaînes
 */
export function toBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }
  return Boolean(value);
}