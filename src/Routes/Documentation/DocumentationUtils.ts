const getprerequisitesData = (pointKey:string,pointValue:string)=>{
    return {
        pointKey,
        pointValue
    }
}

const prerequisitesData:ListItemPointType[] = [
        getprerequisitesData('Add your profile details',': Make sure your profile is up-to-date with all necessary personal information.'),
        getprerequisitesData('Add your work experience',': Enter all relevant work experiences.'),
        getprerequisitesData('Add your projects',': List all projects you have worked on.'),
]

const requestExample = JSON.stringify({
    user_id: "your_user_id"
  }, null, 2);

  const responseExample = JSON.stringify(  {
    "data": {
        "user": {
            "about": null,
            "last_name": "Mishra",
            "profile_picture": null,
            "showCase": {
                "resume": null,
                "youtube": null,
                "github": null,
                "cover_letter": null,
                "linked_in": null,
                "instagram": null
            },
            "first_name": "Shivanshu",
            "email": "shivanshu@email.com",
            "createdAt": {
                "_seconds": 1719073863,
                "_nanoseconds": 804000000
            }
        },
        "projects": [
            {
                "code_link": "https://github.com/Shaivaan/Youtube-React",
                "user_id": "yLf2PXaFIVSOf2xC73y7yINQ0602",
                "demo_link": "https://youtubewhite.netlify.app/",
                "description": "YouTube is an American online video sharing and social media platform owned by Google. It was launched on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim. It is the second most visited website, right after Google itself.",
                "project_image": "https://firebasestorage.googleapis.com/v0/b/portfolio-a69a4.appspot.com/o/projects%2FImage%20Pasted%20at%202024-5-17%2016-16.png_0683054c-f9e2-4460-b78c-66132ae1cd29?alt=media&token=29fafb7e-bbef-4a5c-9c9d-4ed4e9800b19",
                "title": "Youtube",
                "tech_used": [
                    "CSS",
                    "HTML",
                    "React",
                    "JavaScript"
                ]
            }
        ],
        "workExp": [
            {
                "end_date": {
                    "_seconds": 1673029800,
                    "_nanoseconds": 0
                },
                "exp_desciption": "Good Exp",
                "joining_date": {
                    "_seconds": 1642530600,
                    "_nanoseconds": 0
                },
                "company_logo": "https://firebasestorage.googleapis.com/v0/b/portfolio-a69a4.appspot.com/o/workExp%2FScreenshot%202024-05-07%20192014.png_e3cf5b6a-328b-4ab7-a126-47d7ce11be7d?alt=media&token=9eb2f9c1-363f-4713-b345-dc1352249550",
                "user_id": "yLf2PXaFIVSOf2xC73y7yINQ0602",
                "is_currently_working": false,
                "company_name": "XYZ Company"
            }
        ]
    }
}, null, 2);
const tsLink = "https://dustbin.me/ofarkcgr"


export {responseExample, prerequisitesData,requestExample,tsLink}