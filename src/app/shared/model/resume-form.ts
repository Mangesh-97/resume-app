
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
    schoolUni: string[]
    skillsArray: ISkillsArray[],
    id?: string
}

export interface ISkillsArray {
    name: string
}
