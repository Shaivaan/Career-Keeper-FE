 interface Root {
    data: Data
  }
  
   interface Data {
    user: User
    projects: Project[]
    workExp: WorkExp[]
  }
  
   interface User {
    about: any
    last_name: string
    profile_picture: any
    showCase: ShowCase
    first_name: string
    email: string
    createdAt: CreatedAt
  }
  
   interface ShowCase {
    resume: any
    youtube: any
    github: any
    cover_letter: any
    linked_in: any
    instagram: any
  }
  
   interface CreatedAt {
    _seconds: number
    _nanoseconds: number
  }
  
   interface Project {
    code_link: string
    user_id: string
    demo_link: string
    description: string
    project_image: string
    title: string
    tech_used: string[]
  }
  
   interface WorkExp {
    end_date: EndDate
    exp_desciption: string
    joining_date: JoiningDate
    company_logo: string
    user_id: string
    is_currently_working: boolean
    company_name: string
  }
  
   interface EndDate {
    _seconds: number
    _nanoseconds: number
  }
  
   interface JoiningDate {
    _seconds: number
    _nanoseconds: number
  }
  