/**
 * Interface for the 'Diseases' data
 */
import {Disease, GardHierarchy} from "@ncats-frontend-library/models/gard/gard-models";


export interface DiseasesEntity {
  id: string | number; // Primary ID
  name: string;
  disease?: Disease;
}

