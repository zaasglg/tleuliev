export interface VillageModel {
    id: number;
    name: string;
    district_id: number;
    district_name: string;
}

export interface DistrictModel {
    id: number;
    name: string;
    region_id: number;
    region_name: string;
    villages: VillageModel[];
}

export interface RegionModel {
    id: number;
    name: string;
    districts: DistrictModel[];
}
