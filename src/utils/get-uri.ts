export const getSagaBadgeMetadata = ({
    studentName,
    studentAddress,
    badgeName,
    imageName
}: {
    studentName: string,
    studentAddress: string,
    badgeName: string,
    imageName: string
}) => {
    return JSON.stringify({
        name: `${badgeName} - Saga Bootcamp 2025`,
        description: "This badge is awarded to those who completed the Saga Bootcamp 2025 at VBI Academy",
        image: `https://ipfs.io/ipfs/bafybeien46rk66xahkk6lky6bcigbnslftmx3qosneob3sgej7yf7vtpzm/${imageName}.png`,
        external_url: "https://vbiacademy.edu.vn/en/courses/saga-bootcamp-10231",
        attributes: [
            {
                trait_type: "Course",
                value: "Saga Bootcamp 2025"
            },
            {
                trait_type: "Institution",
                value: "VBI Academy"
            },
            {
                trait_type: "Student Name",
                value: studentName
            },
            {
                trait_type: "Student Address",
                value: studentAddress
            },
            {
                trait_type: "Badge Type",
                value: badgeName
            },
            {
                trait_type: "Completion Year",
                value: "2025"
            }
        ]
    })
}