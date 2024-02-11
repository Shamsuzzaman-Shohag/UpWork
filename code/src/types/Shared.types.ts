export type TypeSuburbHint = {
  id: string;
  name: string;
  state: string;
  postcode: string;
  label: string;
}[];

export type TypeHintsRequest = {
  term: string;
  limit: number;
} & Record<string, any>;

export type TypeAutocompleteLabel = {
  id: string;
  type: string;
  label: string;
};

export type TypeAutocompleteLabels = {
  items: TypeAutocompleteLabel[];
};

export type TypeAutocompleteLabelRequest = {
  items: {
    id: string;
    type: "AGENCY" | "PARTICIPANT" | "PROVIDER" | "SUPPORT_ITEM" | "PLAN";
  }[];
};

export type TypeEventHubResponse = {
  eventRef: string;
  agencyId: string;
  planId: string;
  userId?: string;
  groupId: string;
  objectId: string;
  cognateId: string;
  timeStamp: Date;
};

export type TypeNdisConnectivityHubResponse = {
  isServiceDown: boolean;
  serviceDownMessage: string;
};

export type TypeTableRenderValue = {
  val: number;
  isShowLoader: boolean;
};