/**
 * Interface for the 'Diseases' data
 */

// todo models should probably be a library
import {Disease} from "../../../../../../../models/gard/disease";

export interface DiseasesEntity {
  id: string | number; // Primary ID
  name: string;
  disease?: Disease;
}
