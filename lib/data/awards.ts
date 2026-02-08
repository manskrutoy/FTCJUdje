export interface Award {
    id: string
    name: string
    description: string
    whatJudgesWant: string
    strongSignals: string[]
    redFlags: string[]
    checklist: string[]
    exampleStructures: string[]
}

export const awards: Award[] = [
    {
        id: 'inspire',
        name: 'Inspire Award',
        description: 'The Inspire Award is the highest award presented at FTC Championships. It celebrates a team that embodies the FIRST values and has demonstrated excellence in all areas.',
        whatJudgesWant: 'Judges want to see comprehensive excellence: a strong robot, documented engineering process, meaningful community outreach, effective teamwork, and embodiment of Gracious Professionalism. This team should inspire others.',
        strongSignals: [
            'Consistent excellence across all judging categories',
            'Strong robot performance with documented iterative design',
            'Measurable community impact (numbers, testimonials)',
            'Clear examples of Gracious Professionalism',
            'Team members who speak passionately and coherently',
            'Evidence of sustainable practices and team growth',
        ],
        redFlags: [
            'Vague claims without specific examples or data',
            'Focus only on robot, neglecting outreach or teamwork',
            'No mention of failures or learning from mistakes',
            'Memorized responses without genuine understanding',
            'Inability to answer follow-up questions',
        ],
        checklist: [
            'Documented engineering process in notebook',
            'Robot performs well and demonstrates innovation',
            'Measurable community outreach (# of students reached, events held)',
            'Specific examples of team collaboration',
            'Evidence of Gracious Professionalism',
            'Clear vision for team sustainability',
        ],
        exampleStructures: [
            'Problem → Our Approach → Results → Impact: "We noticed [problem], so we [action], which resulted in [measurable outcome], impacting [number] people."',
            'STAR Method: Situation → Task → Action → Result: "During testing, we faced [situation]. Our task was [goal]. We took [action], achieving [result]."',
            'Before → After: "Before [approach], we struggled with [problem]. After implementing [solution], we improved by [metric]."',
        ],
    },
    {
        id: 'think',
        name: 'Think Award',
        description: 'The Think Award recognizes a team that demonstrates exceptional engineering practices. The Engineering Notebook is critical evidence.',
        whatJudgesWant: 'Judges want to see a clear, iterative design process with evidence of testing, data analysis, and continuous improvement. Your Engineering Notebook should tell the story.',
        strongSignals: [
            'Well-organized Engineering Notebook with dates, measurements, and iterations',
            'Clear problem statements and hypotheses',
            'Data from tests (times, distances, success rates)',
            'Evidence of learning from failures',
            'Multiple design iterations with rationale for changes',
            'Team collaboration on engineering decisions',
        ],
        redFlags: [
            'No data or measurements in notebook',
            'Notebook created retrospectively ("we did this, then wrote about it")',
            'No mention of failures or adjustments',
            'Vague engineering explanations',
            'Only one person can answer engineering questions',
        ],
        checklist: [
            'Engineering Notebook is complete and organized',
            'Document all design iterations with dates',
            'Include test data (numbers, charts, photos)',
            'Explain why you made design changes',
            'Show how you learned from failures',
            'Multiple team members understand the engineering process',
        ],
        exampleStructures: [
            'Iteration Cycle: "In iteration 1, we tested [design]. Results showed [data]. In iteration 2, we changed [component] because [reason]. This improved performance by [percentage]."',
            'Problem-Solving: "Our biggest challenge was [problem]. We hypothesized [solution]. After testing, we found [result], so we adjusted [approach]."',
            'Data-Driven: "We ran 10 tests. Average score was [X]. After modifying [component], average improved to [Y], a [Z]% increase."',
        ],
    },
    {
        id: 'design',
        name: 'Design Award',
        description: 'The Design Award recognizes teams that use an effective design process, including CAD, prototyping, and intelligent component selection.',
        whatJudgesWant: 'Judges want to see intentional design choices. Why did you choose this motor? This material? This mechanism? Show evidence of research, CAD, prototyping, and testing.',
        strongSignals: [
            'CAD models or detailed sketches in notebook',
            'Justification for all major component choices',
            'Evidence of prototyping (photos, test results)',
            'Understanding of trade-offs (weight vs. strength, speed vs. torque)',
            'Integration of industrial design principles',
            'Unique or innovative mechanisms',
        ],
        redFlags: [
            'No CAD or design documentation',
            'Can\'t explain why components were chosen',
            'Robot looks thrown together without planning',
            'No prototyping or testing before building final robot',
            'Copying designs without understanding',
        ],
        checklist: [
            'Create CAD models or detailed sketches',
            'Document why you chose each major component',
            'Show prototypes and test results',
            'Explain design trade-offs',
            'Demonstrate understanding of mechanical principles',
            'Include industrial design considerations (aesthetics, user interface)',
        ],
        exampleStructures: [
            'Design Decision: "We chose [component] over [alternative] because [reason based on testing/research]. This gave us [benefit] at the cost of [trade-off]."',
            'Prototyping Process: "We built 3 prototypes of our intake mechanism. Prototype 1 used [design], but [problem]. Prototype 2 improved [aspect], but [issue]. Final design uses [solution] because [data]."',
            'CAD Impact: "Before building, we simulated [mechanism] in CAD. This revealed [problem], so we adjusted [component], saving [time/materials]."',
        ],
    },
    {
        id: 'impact',
        name: 'Impact Award',
        description: 'The Impact Award recognizes teams that demonstrate the most significant positive impact on their community through FIRST outreach and education.',
        whatJudgesWant: 'Judges want to see measurable, sustained impact on your community. Numbers matter: how many students reached? Events held? Resources created? Show evidence of real change.',
        strongSignals: [
            'Quantifiable metrics (# of students, events, hours)',
            'Documentation with photos, videos, testimonials',
            'Sustainable programs that continue beyond the season',
            'Partnerships with schools, libraries, community organizations',
            'Evidence of inspiring others to join STEM',
            'Diversity and inclusion efforts with measurable results',
        ],
        redFlags: [
            'Vague claims like "we helped many students" without numbers',
            'One-time events without sustained impact',
            'No evidence or documentation of outreach',
            'Outreach done only for the award, not genuine passion',
            'Can\'t articulate specific ways people were impacted',
        ],
        checklist: [
            'Track ALL outreach metrics (students, events, hours)',
            'Collect photos, videos, testimonials from participants',
            'Show sustainability: how will your program continue?',
            'Document partnerships and collaborations',
            'Demonstrate inclusivity and accessibility',
            'Explain how you measured impact',
        ],
        exampleStructures: [
            'Metrics-First: "We reached [number] students through [number] events over [timeframe]. [Percentage] reported increased interest in STEM based on [survey/feedback]."',
            'Before-After Impact: "Before our program, [school/org] had [baseline]. After [timeframe], they now have [result], a [percentage] increase."',
            'Sustainability Story: "We started with [pilot]. After seeing [results], we expanded to [scale]. Now [number] mentors continue the program year-round."',
        ],
    },
    {
        id: 'control',
        name: 'Control Award',
        description: 'The Control Award celebrates teams whose robot demonstrates outstanding control through sensors, programming, and autonomous functionality.',
        whatJudgesWant: 'Judges want to see sophisticated sensor usage, robust autonomous programs, and intelligent robot behavior. Explain your control system architecture and how sensors inform decisions.',
        strongSignals: [
            'Multiple sensors used effectively (encoders, IMU, color, distance)',
            'Reliable autonomous program with contingency planning',
            'Control algorithms (PID, odometry, computer vision)',
            'Sensor data logged and analyzed',
            'Graceful handling of failures (sensor errors, obstacles)',
            'Driver assistance features using sensors',
        ],
        redFlags: [
            'Basic autonomous with no sensor feedback',
            'Sensors installed but not used effectively',
            'No understanding of control theory or programming',
            'Autonomous that only works in perfect conditions',
            'Can\'t explain how sensors improve robot performance',
        ],
        checklist: [
            'List all sensors and their purposes',
            'Document control algorithms in notebook',
            'Show sensor data from tests (graphs, logs)',
            'Explain autonomous logic with flowcharts',
            'Demonstrate error handling and recovery',
            'Measure autonomous success rate with data',
        ],
        exampleStructures: [
            'Sensor Integration: "We use [sensor] to measure [parameter]. This data feeds into [algorithm], which adjusts [action]. During testing, this improved [metric] by [percentage]."',
            'Autonomous Robustness: "Our autonomous has [number] checkpoints. If [error condition], the robot executes [fallback behavior]. Success rate improved from [before]% to [after]%."',
            'Control Algorithm: "We implemented [algorithm] to control [system]. Tuning parameters through [method], we reduced error from [before] to [after]."',
        ],
    },
    {
        id: 'connect',
        name: 'Connect Award',
        description: 'The Connect Award recognizes teams who connect with their community beyond robotics, inspiring STEM interest and building strong partnerships.',
        whatJudgesWant: 'Judges want to see how you connected your engineering work to real-world problems and how you built meaningful relationships with your community, mentors, and sponsors.',
        strongSignals: [
            'Strong mentor/sponsor relationships with clear value exchange',
            'Community partnerships aligned with team mission',
            'Networking with other teams, sharing knowledge',
            'Connecting STEM to real community needs',
            'Documentation of partnership value (testimonials, joint projects)',
            'Sustained relationships beyond transactional support',
        ],
        redFlags: [
            'Sponsor listed but no meaningful relationship',
            'One-sided relationships (only asking for money/resources)',
            'No evidence of connecting engineering to community needs',
            'Isolated team that doesn\'t engage with broader community',
            'Can\'t articulate specific value provided to partners',
        ],
        checklist: [
            'List all mentors, sponsors, partners with roles',
            'Document what each partner contributed AND received',
            'Show evidence of knowledge sharing with other teams',
            'Explain how you connected STEM to community challenges',
            'Collect testimonials from partners',
            'Demonstrate growth in partnerships over time',
        ],
        exampleStructures: [
            'Partnership Value: "Our partnership with [organization] began when [context]. We provided [our contribution], and they provided [their contribution]. Together we achieved [result]."',
            'Community Connection: "We identified [community need] and applied our [STEM skills] to help. This resulted in [outcome], benefiting [number] people."',
            'Knowledge Sharing: "We mentored [number] rookie teams. We shared [resources/knowledge], and learned [lessons] from them. [Percentage] of teams we mentored advanced to regionals."',
        ],
    },
    {
        id: 'innovate',
        name: 'Innovate Award',
        description: 'The Innovate Award celebrates creative, novel solutions to game challenges or broader problems, validated through testing and refinement.',
        whatJudgesWant: 'Judges want to see true innovation: something new, creative, and effective. It doesn\'t have to be world-changing, but it should be thoughtful, tested, and proven to work.',
        strongSignals: [
            'Novel mechanism or approach not commonly seen',
            'Clear problem statement that innovation addresses',
            'Testing data showing innovation works',
            'Iterations that refined the innovative concept',
            'Potential applications beyond FTC',
            'Understanding of why innovation is better than alternatives',
        ],
        redFlags: [
            'Copying innovation from another team without understanding',
            'Innovative idea that doesn\'t actually work',
            'No testing or validation of innovation',
            'Innovation for the sake of being different, not better',
            'Can\'t explain the innovation\'s unique value',
        ],
        checklist: [
            'Define the problem your innovation solves',
            'Explain what makes your solution innovative',
            'Test your innovation and collect data',
            'Compare to alternative approaches',
            'Document iterations and improvements',
            'Identify potential applications beyond robotics',
        ],
        exampleStructures: [
            'Innovation Journey: "We noticed [problem] that existing solutions don\'t address. We invented [innovation] which uses [novel approach]. Testing showed [data], a [percentage] improvement over [baseline]."',
            'Why It\'s Better: "Traditional approaches use [method], but this has [limitation]. Our innovation uses [different approach] because [reason]. This provides [benefit] while avoiding [previous limitation]."',
            'Validation: "We built [number] prototypes. Prototype 1 achieved [result]. After [modifications], final version achieved [improved result]. Compared to standard approach, we improved [metric] by [percentage]."',
        ],
    },
]

export function getAwardById(id: string): Award | undefined {
    return awards.find(award => award.id === id)
}
