declare global {
  interface Window {
    // Minimal typing for the places AutocompleteService used in the project
    google?: {
      maps?: {
        places?: {
          AutocompleteService?: {
            getPlacePredictions(
              request: {
                input: string;
                componentRestrictions?: { country?: string | string[] };
              },
              callback: (
                predictions?: Array<{
                  description?: string;
                  structured_formatting?: { main_text?: string };
                }>,
              ) => void,
            ): void;
          };
        };
      };
    };
  }
}

export {};
