/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    google?: any;
  }

  namespace google {
    namespace maps {
      namespace places {
        interface AutocompleteService {
          getPlacePredictions(request: any, callback: (predictions?: Array<{ main_text?: string }>) => void): void;
        }
      }
    }
  }
}

export {};