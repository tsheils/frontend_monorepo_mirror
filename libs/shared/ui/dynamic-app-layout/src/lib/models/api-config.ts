import {InjectionToken} from "@angular/core";

export interface ApiConfig {
  /**
   * field name
   */
  field: string;

  /**
   * readable label
   */
  label?: string;

  /**
   * url to call to retrieve data
   */
  url?: string;

  /**
   * description of field/api call to be used in help panel
   */
  description?: string;

  /**
   * source or provenance of data
   * todo not yet implemented/retrieved
   */
  source?: string;

  /**
   * option injection token for adding a detailed article about the api to be used in help panel
   */
  article?: InjectionToken<string>;
}
