export const FOLDER_CATALOG = Object.freeze([
  {
    id: 'components',
    label: 'Components Library',
    description: 'Unlocks the UI kit, interface recipes, and component demos.',
  },
  {
    id: 'style-classes',
    label: 'Style Classes',
    description: 'Advanced typography, token references, and theming snippets.',
  },
  {
    id: 'image-index',
    label: 'Image Index',
    description: 'Optimised asset manifest and usage guidelines.',
  },
  {
    id: 'components/book-details',
    label: 'Book Detail Tabs',
    description: 'Nested component blueprints used across hero book layouts.',
  },
  {
    id: 'press-kit',
    label: 'Press & Media Kits',
    description: 'High fidelity assets prepared for partner releases.',
  },
]);

export const FOLDER_LOOKUP = Object.freeze(
  FOLDER_CATALOG.reduce((acc, folder) => {
    acc[folder.id] = folder;
    return acc;
  }, /** @type {Record<string, typeof FOLDER_CATALOG[number]>} */ ({})),
);

export const DEFAULT_REDIRECT = '/dashboard.html';

export default FOLDER_CATALOG;
