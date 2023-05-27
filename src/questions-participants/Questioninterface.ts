export interface Option {
    id: number;
    label: string;
    description: string | null;
    surveyQuestionId: number;
    languageId: number | null;
    imageUrl: string | null;
    index: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
export interface EvoteOption {
    id: number;
    label: string;
    description: string | null;
    surveyQuestionId: number;
    languageId: number | null;
    imageUrl: string;
    index: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

export interface imageVoteOption {
    id: number;
    label: string;
    description: string | null;
    surveyQuestionId: number;
    languageId: number | null;
    imageUrl: string
    index: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}


export interface npsOption {
    id: number;
    label: string;
    description: string | null;
    index: number;
    surveyQuestionId: number;
    languageId: number | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    color: string;
}

export interface rankingOption {
    id: number;
    label: string;
    description: string | null;
    surveyQuestionId: number;
    languageId: number | null;
    imageUrl: string | null;
    index: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

export interface matrixQuestionOption {
    id: number;
    label: string;
    description: string | null;
    surveyQuestionId: number;
    languageId: number | null;
    imageUrl: string | null;
    index: number;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}
