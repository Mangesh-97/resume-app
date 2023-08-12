
export interface skill {
    name: string;
}

export interface Iresume {
    address: string
    education: string[]
    email: string
    fullName: string
    langEnglish: boolean
    langHindi: boolean
    langMarathi: boolean
    objective: string
    phone: string
    board: string[]
    skillsArray: ISkillsArray[],
    id?: string,
    employment: string
    companyName?: string
    experience?: 'Experinced' | 'Fresher',
    designation?: string
}

export interface ISkillsArray {
    name: string
}
