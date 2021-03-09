<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <v-stepper v-model="e1">
          <v-stepper-items>
            <v-stepper-content
              v-for="(item, i) in competencies"
              :key="`${i}`"
              :step="i + 1"
            >
              <!-- start of card form -->
              <v-card class="ma-0 elevation-0" color="white lighten-1">
                <h3>
                  {{ i + 1 }}
                  <span style="font-size: 10px; color: grey">of 24</span>.)
                  {{ item.title }}
                </h3>
                <p style="font-size:14px;">
                  <i>{{ item.description }}</i>
                </p >
                

                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Level</th>
                        <th class="text-left">
                          Proficiency/ Mastery Level Behavioral Indicators
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(level, k) in item.levels" :key="k">
                        <td style="white-space: nowrap">
                          <v-checkbox
                            v-model="selected[i]"
                            :value="k+1"
                            :label="`Level ${k + 1}`"
                          />
                        </td>
                        <td>{{ level.proficiency }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>





              </v-card>
              <v-card-actions>

                <v-btn color="primary" @click="nextStep(i + 1)" text>
                  Continue
                </v-btn>

                <v-btn
                  v-if="i + 1 !== 1"
                  color="primary"
                  @click="backStep(i + 1)"
                  text
                >
                  Back
                </v-btn>

                <v-btn color="primary" @click="logMe()" text> log </v-btn>
                <!-- <v-spacer></v-spacer> -->

              </v-card-actions>
              <!-- end of card form -->

              <!-- <v-btn text>
            Cancel
          </v-btn> -->
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  //   computed: mapGetters({ testing: "getTesting" }),
  methods: {
    logMe() {
      console.log("selected: ", this.selected);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    backStep(n) {
      if (n === 1) {
        this.e1 = 1;
      } else {
        this.e1 = n - 1;
      }
    },
  },
  data() {
    return {
      selected: [1,2,3,4,5,],
      e1: 1,
      steps: 24,
      // beginning of competencies
      competencies: [
        {
          title: "Adaptability",
          description:
            "Adjusting own behaviors to work efficiently and effectively in light of new information, changing situations and/or different environments.",
          levels: [
            {
              proficiency: "Recognizes how change will affect work.",
              behaviors: [
                "Accepts that things will change.",
                "Seeks clarification when faced with ambiguity or uncertainty.",
                "Demonstrates willingness to try new approaches.",
                "Suspends judgment; thinks before acting.",
                "Acknowledges the value of others’ contributions regardless of how they are presented.",
              ],
            },
            {
              proficiency: "Adapts one's work to a situation.",
              behaviors: [
                "Adapts personal approach to meet the needs of different or new situations.",
                "Seeks guidance in adapting behavior to the needs of a new or different situation.",
              ],
            },
            {
              proficiency: "Adapts to a variety of changes.",
              behaviors: [
                "Adapts to new ideas and initiatives across a wide variety of issues or situations.",
                "Shifts priorities, changes style and responds with new approaches as needed to deal with new or changing demands.",
              ],
            },
            {
              proficiency: "Adapts to large, complex and/or frequent changes.",
              behaviors: [
                "Publicly supports and adapts to major/fundamental changes that show promise of improving established ways of operating.",
                "Seeks opportunities for change in order to achieve improvement in work processes, systems, etc.",
                "Maintains composure and shows self control in the face of challenges and change.",
              ],
            },
            {
              proficiency: "Adapts organizational strategies.",
              behaviors: [
                "Anticipates change and makes large or long-term adaptations in organization in response to the needs of the situation.",
                "Performs effectively amidst continuous change, ambiguity and, at times, apparent chaos.",
                "Shifts readily between dealing with macro-strategic issues and critical details.",
              ],
            },
          ],
        },
        {
          title: "Continuous Learning",
          description:
            "Identifying and addressing individual strengths and weaknesses, developmental needs and changing circumstances to enhance personal and organizational performance.",
          levels: [
            {
              proficiency:
                "Assesses and monitors oneself to maintain personal effectiveness.",
              behaviors: [
                "Continually self-assesses and seeks feedback from others to identify strengths and weaknesses and ways of improving.",
                "Pursues learning opportunities and ongoing development",
              ],
            },
            {
              proficiency:
                "Seeks to improve personal effectiveness in current situation.",
              behaviors: [
                "Tries new approaches to maximize learning in current situation.",
                "Takes advantage of learning opportunities (e.g., courses, observation of others, assignments, etc.).",
                "Integrates new learning into work methods.",
              ],
            },
            {
              proficiency:
                "Seeks learning opportunities beyond current requirements.",
              behaviors: [
                "Sets challenging goals and standards of excellence for self in view of growth beyond current job.",
                "Actively pursues self-development on an ongoing basis (technically and personally).",
                "Pursues assignments designed to challenge abilities.",
              ],
            },
            {
              proficiency:
                "Aligns personal development with objectives of organization.",
              behaviors: [
                "Designs personal learning objectives based on evolving needs of the portfolio or business unit.",
                "Uses organizational change as an opportunity to develop new skills and knowledge.",
              ],
            },
            {
              proficiency:
                "Aligns personal learning with anticipated change in organizational strategy.",
              behaviors: [
                "Identifies future competencies and expertise required by the organization and develops and pursues learning plans accordingly.",
                "Continuously scans the environment to keep abreast of emerging developments in the broader work context.",
              ],
            },
          ],
        },
        {
          title: "Communication",
          description:
            "Listening to others and communicating in an effective manner that fosters open communication.",
          levels: [
            {
              proficiency: "Listens & clearly presents information.",
              behaviors: [
                "Makes self-available and clearly encourages others to initiate communication.",
                "Listens actively and objectively without interrupting.",
                "Checks own understanding of others’ communication (e.g., repeats or paraphrases, asks additional questions).",
                "Presents appropriate information in a clear and concise manner, both orally and in writing.",
              ],
            },
            {
              proficiency: "Fosters two-way communication.",
              behaviors: [
                "Elicits comments or feedback on what has been said.",
                "Maintains continuous open and consistent communication with others.",
                "Openly and constructively discusses diverse perspectives that could lead to misunderstandings.",
                "Communicates decisions or recommendations that could be perceived negatively, with sensitivity and tact.",
                "Supports messages with relevant data, information, examples and demonstrations.",
              ],
            },
            {
              proficiency: "Adapts communication to others.",
              behaviors: [
                "Adapts content, style, tone and medium of communication to suit the target audience’s language, cultural background and level of understanding.",
                "Takes others’ perspectives into account when communicating, negotiating or presenting arguments (e.g., presents benefits from all perspectives).",
                "Responds to and discusses issues/questions in an understandable manner without being defensive and while maintaining the dignity of others.",
                "Anticipates reactions to messages and adapts communications accordingly.",
              ],
            },
            {
              proficiency: "Communicates complex messages.",
              behaviors: [
                "Handles complex on-the-spot questions (e.g., from senior public officials, special interest groups or the media).",
                "Communicates complex issues clearly and credibly with widely varied audiences.",
                "Uses varied communication systems, methodologies and strategies to promote dialogue and shared understanding.",
                "Delivers difficult or unpopular messages with clarity, tact and diplomacy.",
              ],
            },
            {
              proficiency: "Communicates strategically.",
              behaviors: [
                "Communicates strategically to achieve specific objectives (e.g., considering such aspects as the optimal message to present, timing and forum of communication).",
                "Identifies and interprets departmental policies and procedures for superiors, subordinates and peers.",
                "Acknowledges success and the need for improvement.",
              ],
            },
          ],
        },
        {
          title: "Organizational Awareness",
          description:
            "Understanding the workings, structure and culture of the organization as well as the political, social and economic issues, to achieve results.",
          levels: [
            {
              proficiency: "Understands formal structure.",
              behaviors: [
                "Monitors work to ensure it aligns with formal procedures and the organization’s accountabilities.",
                "Recognizes and uses formal structure, rules, processes, methods or operations to accomplish work.",
                "Actively supports the public service mission and goals.",
              ],
            },
            {
              proficiency: "Understands informal structure and culture.",
              behaviors: [
                "Uses informal structures; can identify key decision-makers and influencers.",
                "Effectively uses both formal and informal channels or networks for acquiring information, assistance and accomplishing work goals.",
              ],
            },
            {
              proficiency: "Effectively operates in external environments.",
              behaviors: [
                "Achieves solutions acceptable to varied parties based on understanding of issues, climates and cultures in own and other organizations.",
                "Accurately describes the issues and culture of external stakeholders. Uses this information to negotiate goals and initiatives.",
              ],
            },
            {
              proficiency:
                "Understands organizational politics, issues and external influences.",
              behaviors: [
                "Anticipates issues, challenges and outcomes and effectively operates to best position the organization.",
                "Supports the changing culture and methods of operating, if necessary, for the success of the organization.",
                "Ensures due diligence by keeping informed of business and operational plans and practices.",
              ],
            },
            {
              proficiency:
                "Operates effectively in a broad spectrum of political, cultural and social milieu.",
              behaviors: [
                "Demonstrates broad understanding of social and economic context within which the organization operates.",
                "Understands and anticipates the potential trends of the political environment and the impact these might have on the organization.",
                "Operates successfully in a variety of social, political and cultural environments.",
                "Uses organizational culture as a means to influence and lead the organization.",
              ],
            },
          ],
        },
        {
          title: "Creative Thinking",
          description:
            "Questioning conventional approaches, exploring alternatives and responding to challenges with innovative solutions or services, using intuition, experimentation and fresh perspectives.",
          levels: [
            {
              proficiency: "Acknowledges the need for new approaches.",
              behaviors: [
                "Is open to new ideas.",
                "Questions the conventional approach and seeks alternatives.",
                "Recognizes when a new approach is needed; integrates new information quickly while considering different options.",
              ],
            },
            {
              proficiency: "Modifies current approaches.",
              behaviors: [
                "Analyzes strengths and weaknesses of current approaches.",
                "Modifies and adapts current methods and approaches to better meet needs.",
                "Identifies alternate solutions based on precedent.",
                "Identifies an optimal solution after weighing the advantages and disadvantages of alternative approaches.",
              ],
            },
            {
              proficiency: "Introduces new approaches.",
              behaviors: [
                "Searches for ideas or solutions that have worked in other environments and applies them to the organization.",
                "Uses existing solutions in innovative ways to solve problems.",
                "Sees long-term consequences of potential solutions.",
              ],
            },
            {
              proficiency: "Creates new concepts.",
              behaviors: [
                "Integrates and synthesizes relevant concepts into a new solution for which there is no previous experience.",
                "Creates new models and methods for the organization.",
                "Identifies flexible and adaptable solutions while still recognizing professional and organizational standards.",
              ],
            },
            {
              proficiency: "Nurtures creativity.",
              behaviors: [
                "Develops an environment that nurtures creative thinking, questioning and experimentation.",
                "Encourages challenges to conventional approaches.",
                "Sponsors experimentation to maximize potential for innovation.",
              ],
            },
          ],
        },
        {
          title: "Networking/Relationship Building",
          description:
            "Building and actively maintaining working relationships and/or networks of contacts to further the organization’s goals.",
          levels: [
            {
              proficiency: "Accesses sources of information.",
              behaviors: [
                "Seeks information from others (e.g., colleagues, customers).",
                "Maintains personal contacts in other parts of the organization with those who can provide work-related information.",
              ],
            },
            {
              proficiency: "Builds key contacts.",
              behaviors: [
                "Seeks out the expertise of others and develops links with experts and information sources.",
                "Develops and nurtures key contacts as a source of information.",
                "Participates in networking and social events internal and external to the organization.",
              ],
            },
            {
              proficiency:
                "Seeks new networking opportunities for self and others.",
              behaviors: [
                "Seeks opportunities to partner and transfer knowledge (e.g., by actively participating in trade shows, conferences, meetings, committees, multi-stakeholder groups and/or seminars).",
                "Cultivates personal networks in different parts of the organization and effectively uses contacts to achieve results.",
                "Initiates and develops diverse relationships.",
              ],
            },
            {
              proficiency: "Strategically expands networks.",
              behaviors: [
                "Builds networks with parties that can enable the achievement of the organization’s strategy.",
                "Brings informal teams of experts together to address issues/needs, share information and resolve differences, as required.",
                "Uses knowledge of the formal or informal structure and the culture to further strategic objectives.",
              ],
            },
            {
              proficiency: "Creates networking opportunities.",
              behaviors: [
                "Creates and facilitates forums to develop new alliances and formal networks.",
                "Identifies areas to build strategic relationships.",
                "Contacts senior officials to identify potential areas of mutual, long-term interest.",
              ],
            },
          ],
        },
        {
          title: "Conflict Management",
          description: "Preventing, managing and resolving conflicts.",
          levels: [
            {
              proficiency: "Identifies conflict.",
              behaviors: [
                "Recognizes that there is a conflict between two or more parties.",
                "Brings conflict to the attention of the appropriate individual(s).",
              ],
            },
            {
              proficiency: "Addresses existing conflict.",
              behaviors: [
                "Listens to differing points of view and emphasizes points of agreement as a starting point to resolving differences.",
                "Openly identifies shared areas of interest in a respectful and timely manner.",
              ],
            },
            {
              proficiency:
                "Anticipates and addresses sources of potential conflict.",
              behaviors: [
                "Anticipates and takes action to avoid/reduce potential conflict (e.g., by encouraging and supporting the various parties to get together and attempt to address the issues themselves).",
                "Refocuses teams on the work and end-goals, and away from personality issues.",
              ],
            },
            {
              proficiency:
                "Introduces strategies for resolving existing and potential conflict.",
              behaviors: [
                "Provides consultation to or obtains consultation / mediation for those who share few common interests and who are having a significant disagreement.",
                'Introduces innovative strategies for effectively dealing with conflict (e.g., mediation, collaborative and "mutual gains" strategies).',
              ],
            },
            {
              proficiency:
                "Creates an environment where conflict is resolved appropriately.",
              behaviors: [
                "Creates a conflict-resolving environment by anticipating and addressing areas where potential misunderstanding and disruptive conflict could emerge.",
                "Models constructive approaches to deal with opposing views when personally challenging the status quo and when encouraging others to do so as well.",
              ],
            },
          ],
        },
        {
          title: "Stewardship of Resources",
          description:
            "Ensures the effective, efficient and sustainable use of government resources and assets (physical, human and financial resources).",
          levels: [
            {
              proficiency: "Uses resources effectively.",
              behaviors: [
                "Protects and uses resources and assets in a conscientious and effective manner.",
                "Identifies wasteful practices and opportunities for optimizing resource use.",
              ],
            },
            {
              proficiency: "Ensures effective use of resources.",
              behaviors: [
                "Monitors and ensures the efficient and appropriate use of resources and assets.",
                "Explores ways of leveraging funds to expand program effectiveness.",
              ],
            },
            {
              proficiency: "Controls resource use.",
              behaviors: [
                "Allocates and controls resources and assets within own area.",
                "Implements ways of more effectively utilizing resources and assets.",
                "Assigns and communicates roles and accountabilities to maximize team effectiveness; manages workload.",
              ],
            },
            {
              proficiency:
                "Implements systems to ensure stewardship of resources.",
              behaviors: [
                "Identifies gaps in resources that impact on the organization’s effectiveness.",
                "Develops strategies to address resource gaps/issues.",
                "Ensures alignment of authority, responsibility and accountability with organizational objectives.",
                "Ensures that information and knowledge sharing is integrated into all programs and processes.",
                "Acts on audit, evaluation and other objective project team performance information.",
              ],
            },
            {
              proficiency: "Ensures strategic stewardship of resources.",
              behaviors: [
                "Directs resources to those areas where they will most effectively contribute to long-term goals.",
                "Sets overall direction for how resources and assets are to be used in order to achieve the vision and values.",
                "Institutes organization-wide mechanisms and processes to promote and support resource management.",
              ],
            },
          ],
        },
        {
          title: "Risk Management",
          description:
            "Identifying, assessing and managing risk while striving to attain objectives.",
          levels: [
            {
              proficiency: "Identifies possible risks.",
              behaviors: [
                "Describes risk factors related to a situation/activity.",
                "Uses past experience and best practices to identify underlying issues, potential problems and risks.",
                "Plans for contingencies.",
                "Identifies possible cause-effect relationships.",
              ],
            },
            {
              proficiency: "Takes calculated risks.",
              behaviors: [
                "Takes calculated risks with minor, but non-trivial, consequences of error (e.g., risks involving potential loss of some time or money but which can be rectified).",
                "Makes decisions based on risk analysis.",
                "Makes decisions in the absence of complete information.",
              ],
            },
            {
              proficiency: "Personally takes significant risks.",
              behaviors: [
                "Personally takes calculated risks with significant consequences (e.g., significant loss of time or money) but which can be rectified.",
                "Anticipates the risks involved in taking action.",
                "Identifies possible scenarios regarding outcomes of various options for action.",
                "Conducts ongoing risk analysis, looking ahead for contingent liabilities and opportunities and astutely identifying the risks involved.",
              ],
            },
            {
              proficiency:
                "Designs strategies for dealing with high-risk initiatives.",
              behaviors: [
                "Implements initiatives with high potential for pay-off to the organization, where errors cannot be rectified, or only rectified at significant cost.",
                "Conducts risk assessment when identifying or recommending strategic and tactical options.",
                "Encourages responsible risk taking, recognizing that every risk will not pay off.",
              ],
            },
            {
              proficiency: "Provides organizational guidance on risk.",
              behaviors: [
                "Provides a supportive environment for responsible risk taking (e.g., by supporting decisions of others).",
                "Oversees the development of guidelines, principles and approaches to assist decision-making when risk is a factor.",
                "Provides guidance on the organizational tolerance for risk.",
                "Develops broad strategies that reflect in-depth understanding and assessment of operational, organizational, and political realities and risks.",
              ],
            },
          ],
        },
        {
          title: "Stress Management",
          description: "Maintaining effectiveness in the face of stress.",
          levels: [
            {
              proficiency: "Works in low level stress situations.",
              behaviors: [
                "Keeps functioning effectively during periods of on-going low intensity stress.",
                "Maintains focus during situations involving limited stress.",
                "Seeks to balance work responsibilities and personal life responsibilities.",
              ],
            },
            {
              proficiency: "Adjusts to temporary peaks in stress levels.",
              behaviors: [
                "Maintains composure when dealing with short but intense stressful situations.",
                "Understands personal stressors and takes steps to limit their impact.",
                "Keeps issues and situations in perspective and reacts appropriately (e.g., does not overreact to situations, what others say, etc.).",
              ],
            },
            {
              proficiency: "Adapts to prolonged stress.",
              behaviors: [
                "Effectively withstands the effects of prolonged exposure to one or few stressors by modifying work methods.",
                "Maintains sound judgment and decision making despite on-going stressful situations.",
                "Controls strong emotions or other stressful responses and takes action to respond constructively to the source of the problem.",
              ],
            },
            {
              proficiency: "Employs stress management strategies.",
              behaviors: [
                "Develops and applies stress reduction strategies to cope with long exposure to numerous stressors or stressful situations.",
                "Recognizes personal limits for workload and negotiates adjustments to minimize the effects of stress, while still ensuring appropriate levels of productivity.",
                "Controls own emotions and calms others in stressful situations.",
              ],
            },
            {
              proficiency: "Deals with stress affecting the organization.",
              behaviors: [
                "Demonstrates behaviors that help others remain calm, yet focused and energized during periods of extreme stress affecting the organization.",
                "Maintains composure and shows self-control in the face of significant challenge facing the organization.",
                "Suspends judgment; thinks before acting.",
                "Identifies and consistently models ways of releasing or limiting stress within the organization.",
              ],
            },
          ],
        },
        {
          title: "Influence",
          description:
            "Gaining support from and convincing others to advance the objectives of the organization.",
          levels: [
            {
              proficiency: "Uses facts and available information to persuade.",
              behaviors: [
                "Uses appeals to reason, data, facts and figures.",
                "Uses concrete examples, visual aids and demonstrations to make a point.",
                "Describes the potential impact of own actions on others and how it will affect their perception of self.",
              ],
            },
            {
              proficiency: "Adapts rationale to influence others.",
              behaviors: [
                "Anticipates the effect of one’s approach or chosen rationale on the emotions and sensitivities of others.",
                "Adapts discussions and presentations to appeal to the needs or interests of others.",
                "Uses the process of give-and-take to gain support.",
                "Builds relationships through fair, honest and consistent behavior.",
              ],
            },
            {
              proficiency: "Demonstrates the benefit of ideas.",
              behaviors: [
                "Builds on successful initiatives and best practices internal and external to the organization to gain acceptance for ideas.",
                "Presents pros and cons and detailed analyses to emphasize the value of an idea.",
                "Persuades others by drawing from experience and presenting multiple arguments in order to support a position.",
              ],
            },
            {
              proficiency:
                "Builds coalitions, strategic relationships and networks.",
              behaviors: [
                "Assembles coalitions, builds behind-the-scenes support for ideas and initiatives.",
                "Develops an extensive network of contacts.",
                "Uses group process skills to lead or direct a group.",
              ],
            },
            {
              proficiency: "Designs complex influence strategies.",
              behaviors: [
                "Designs strategies that position and promote ideas and concepts to stakeholders.",
                "Uses indirect strategies to persuade, such as establishing alliances, using experts or third parties.",
                "Gains support by capitalizing on understanding of political forces affecting the organization.",
              ],
            },
          ],
        },
        {
          title: "Initiative",
          description:
            "Identifying and dealing with issues proactively and persistently; seizing opportunities that arise.",
          levels: [
            {
              proficiency: "Addresses current issues.",
              behaviors: [
                "Recognizes and acts on present issues.",
                "Offers ideas to address current situations or issues.",
                "Works independently. Completes assignments without constant supervision.",
              ],
            },
            {
              proficiency: "Addresses imminent issues.",
              behaviors: [
                "Takes action to avoid imminent problem or to capitalize on imminent opportunity.",
                "Looks for ways to achieve greater results or add value.",
                "Works persistently as needed and when not required to do so.",
              ],
            },
            {
              proficiency: "Acts promptly in a crisis situation.",
              behaviors: [
                "Acts quickly to address a crisis situation drawing on appropriate resources and experience with similar situations.",
                "Implements contingency plans when crises arise.",
                "Exceeds requirements of job; takes on extra tasks.",
              ],
            },
            {
              proficiency: "Looks to the future.",
              behaviors: [
                "Takes action to avoid or minimize potential problems or maximize potential opportunities in the future by drawing on extensive personal experience.",
                "Defines and addresses high-level challenges that have the potential to advance the state-of-the art in an area.",
                "Starts and carries through on new projects.",
              ],
            },
            {
              proficiency: "Encourages initiative in others.",
              behaviors: [
                "Fosters an environment that anticipates and acts upon potential threats and/or opportunities.",
                "Coaches others to spontaneously recognize and appropriately act on upcoming opportunities.",
                "Gets others involved in supporting efforts and initiatives.",
              ],
            },
          ],
        },
        {
          title: "Team Leadership",
          description: "Leading and supporting a team to achieve results.",
          levels: [
            {
              proficiency: "Keeps the team informed.",
              behaviors: [
                "Ensures that team members have the necessary information to operate effectively.",
                "Establishes the direction/goal(s) for the team.",
                "Lets team members affected by a decision know exactly what is happening and gives a clear rationale for the decision.",
                "Sets an example for team members (e.g., respect of others’ views, team loyalty, cooperating with others).",
              ],
            },
            {
              proficiency:
                "Ensures the needs of the team and of members are met.",
              behaviors: [
                "Makes sure the practical needs of the team and team members are met.",
                "Makes decisions by taking into account the differences among team members, and overall team requirements and objectives.",
                "Ensures that the team’s tasks are completed.",
                "Accepts responsibility for the team’s actions and results.",
              ],
            },
            {
              proficiency: "Ensures team member input.",
              behaviors: [
                "Values and encourages others’ input and suggestions.",
                "Stimulates constructive discussion of different points of view, focusing on the organization’s strategic objectives, vision or values.",
                "Builds cooperation, loyalty and helps achieve consensus.",
                "Provides constructive feedback and recognizes all contributions.",
                "Ensures the respective strengths of team members are used in order to achieve the team’s overall objectives.",
              ],
            },
            {
              proficiency: "Empowers the team.",
              behaviors: [
                "Communicates team successes and organization-wide contribution to other organizational members.",
                "Encourages the team to promote their work throughout the organization.",
                "Establishes the team’s credibility with internal and external stakeholders.",
              ],
            },
            {
              proficiency: "Inspires team members.",
              behaviors: [
                "Builds the commitment of the team to the organization’s mission, goals and values.",
                "Aligns team objectives and priorities with the broader objectives of the organization.",
                "Ensures that appropriate linkages/partnerships between teams are maintained.",
                "Creates an environment where team members consistently push to improve team performance and productivity.",
              ],
            },
          ],
        },
        {
          title: "Change Leadership",
          description:
            "Managing, leading and enabling the process of change and transition while helping others deal with their effects.",
          levels: [
            {
              proficiency: "Makes others aware of change.",
              behaviors: [
                "Identifies and accepts the need and processes for change.",
                "Explains the process, implications and rationale for change to those affected by it.",
                "Invites discussion of views on the change.",
              ],
            },
            {
              proficiency: "Underscores the positive nature of change.",
              behaviors: [
                "Promotes the advantages of change.",
                "Clarifies the potential opportunities and consequences of proposed changes.",
                "Explains how change affects current practices.",
              ],
            },
            {
              proficiency: "Manages the process for change.",
              behaviors: [
                "Identifies important / effective practices that should continue after change is implemented.",
                "Anticipates specific reasons underlying resistance to change and implements approaches that address resistance.",
              ],
            },
            {
              proficiency:
                "Aligns change initiatives with organizational objectives.",
              behaviors: [
                "Links projects/objectives to department’s/public service’s change initiatives and describes the impact on operational goals.",
                "Presents realities of change and, together with staff, develops strategies for managing it.",
                "Identifies future needs for change that will promote progress toward identified objectives.",
              ],
            },
            {
              proficiency: "Champions change.",
              behaviors: [
                "Creates an environment that promotes and encourages change or innovation.",
                "Shares and promotes successful change efforts throughout the organization.",
                "Personally communicates a clear vision of the broad impact of change.",
              ],
            },
          ],
        },
        {
          title: "Client Focus",
          description:
            "Identifying and responding to current and future client needs; providing service excellence to internal and external clients.",
          levels: [
            {
              proficiency: "Responds to client requests.",
              behaviors: [
                "Identifies client needs and expectations.",
                "Responds to requests efficiently and effectively.",
                "Takes action beyond explicit request within established service standards.",
                "Refers complex questions to a higher decision-making level.",
                "Meets client needs in a respectful, helpful and responsive manner.",
                "Seeks feedback to develop a clear understanding of client needs and outcomes.",
                "Uses client satisfaction monitoring methodologies to ensure client satisfaction.",
                "Adjusts service based on client feedback.",
              ],
            },
            {
              proficiency: "Builds positive client relations.",
              behaviors: [
                "Contacts clients to follow up on services, solutions or products to ensure that their needs have been correctly and effectively met.",
                "Understands issues from the client’s perspective.",
                "Keeps clients up-to-date with information and decisions that affect them.",
                "Monitors services provided to clients and makes timely adjustments as required.",
              ],
            },
            {
              proficiency: "Anticipates and adapts to client needs.",
              behaviors: [
                "Maintains ongoing communication with clients.",
                "Regularly and systematically contacts clients or prospective clients to determine their needs.",
                "Uses understanding of client’s perspective to identify constraints and advocate on their behalf.",
                "Works with clients to adapt services, products or solutions to meet their needs.",
                "Encourages co-workers and teams to achieve a high standard of service excellence.",
                "Anticipates areas where support or influence will be required and discusses situation/concerns with appropriate individuals.",
                "Proposes new, creative and sound alternatives to improve client service.",
              ],
            },
            {
              proficiency: "Fosters a client-focused culture.",
              behaviors: [
                "Tracks trends and developments that will affect own organization’s ability to meet current and future client needs.",
                "Identifies benefits for clients; looks for ways to add value.",
                "Seeks out and involves clients or prospective clients in assessing services, solutions or products to identify ways to improve.",
                "Establishes service standards and develops strategies to ensure staff meet them.",
              ],
            },
            {
              proficiency: "Considers the strategic direction of client focus.",
              behaviors: [
                "Communicates the organization’s mission, vision and values to external clients.",
                "Strategically and systematically evaluates new opportunities to develop client relationships.",
                "Creates an environment in which concern for client satisfaction is a key priority.",
                "Links a comprehensive and in-depth understanding of clients’ long-term needs and strategies with current and proposed projects/initiatives.",
                "Recommends/ determines strategic business direction to meet projected needs of clients and prospective clients.",
              ],
            },
          ],
        },
        {
          title: "Partnering",
          description:
            "Seeking and building strategic alliances and collaborative arrangements through partnerships to advance the objectives of the organization.",
          levels: [
            {
              proficiency: "Operates effectively within partnerships.",
              behaviors: [
                "Understands the roles played by partners. Identifies and refers to areas of mutual interest as a means of establishing a business relationship.",
                "Communicates openly, builds trust and treats partners fairly, ethically and as valued allies.",
                "Meets partner needs by responding to requests efficiently and effectively.",
                "Recognizes the contributions of partners.",
              ],
            },
            {
              proficiency: "Manages existing partnerships.",
              behaviors: [
                "Works with existing partners, honoring established agreements/ contracts.",
                "Monitors partnership arrangements to ensure that the objectives of the partnership remain on target.",
                "Seeks input from partners to ensure that objectives are achieved.",
                "Seeks mutually beneficial solutions with partners.",
              ],
            },
            {
              proficiency: "Seeks out partnership opportunities.",
              behaviors: [
                "Initiates partnership arrangements that promote organizational objectives.",
                "Assesses the value of entering into partner relationships in terms of both short- and long- term return on investment.",
                "Develops new and mutually beneficial partnerships that also serve the interests of the broader community.",
                "Identifies benefits of a partnership and looks for ways to add value for the partner.",
              ],
            },
            {
              proficiency: "Facilitates partnerships",
              behaviors: [
                "Provides advice and direction on the types of partner relationships to pursue, as well as ground rules for effective partner relationships.",
                "Supports staff in taking calculated risks in partner relationships.",
                "Negotiates, as necessary, to assist others to address issues or resolve problems surrounding partner relationships.",
                "Identifies when modifications and terminations of partnerships are needed and takes appropriate measures.",
              ],
            },
            {
              proficiency: "Sets strategic direction for partnering.",
              behaviors: [
                "Provides strategic direction on partnerships that the organization should be pursuing.",
                "Sets up an infrastructure that supports effective partner arrangements (e.g., principles and frameworks for assessing the value of partnerships; expert assistance in aspects of partnering).",
                "Takes advantage of opportunities to showcase excellent examples of partner arrangements throughout the organization.",
                "Creates and acts on opportunities for interactions that lead to strong partnerships within and external to the organization.",
              ],
            },
          ],
        },
        {
          title: "Developing Others",
          description:
            "Fostering the development of others by providing a supportive environment for enhanced performance and professional growth.",
          levels: [
            {
              proficiency: "Shares expertise with others.",
              behaviors: [
                "Regularly shares expertise with team members to support continuous learning and improvement.",
                "Advises, guides and coaches others by sharing experiences and discussing how to handle current or anticipated concerns.",
              ],
            },
            {
              proficiency: "Supports individual development and improvement.",
              behaviors: [
                "Provides performance feedback and support, reinforcing strengths and identifying areas for improvement.",
                "Encourages staff to develop and apply their skills.",
                "Suggests to individuals ways of improving performance and competence.",
              ],
            },
            {
              proficiency: "Promotes ongoing learning and development.",
              behaviors: [
                "Helps team members develop their skills and abilities.",
                "Engages in development and career planning dialogues with employees.",
                "Works with employees and teams to define realistic yet challenging work goals.",
                "Encourages team members to develop learning and career plans and follows-up to guide development and measure progress.",
                "Advocates and commits to ongoing training and development to foster a learning culture.",
              ],
            },
            {
              proficiency: "Provides opportunities for development.",
              behaviors: [
                "Ensures that resources and time are available for development activities.",
                "Ensures that all employees have equitable access to development opportunities.",
                "Provides opportunities for development through tools, assignments, mentoring and coaching relationships etc.",
              ],
            },
            {
              proficiency:
                "Creates a continuous learning and development environment.",
              behaviors: [
                "Provides long-term direction regarding learning needs for staff and how to pursue the attainment of this learning.",
                "Institutes organization-wide mechanisms and processes to promote and support continuous learning and improvement.",
                "Manages the learning process to ensure it occurs by design rather than by chance.",
              ],
            },
          ],
        },
        {
          title: "Planning and Organizing",
          description:
            "Defining tasks and milestones to achieve objectives, while ensuring the optimal use of resources to meet those objectives.",
          levels: [
            {
              proficiency: "Plans tasks and organizes own work.",
              behaviors: [
                "Identifies requirements and uses available resources to meet own work objectives in optimal fashion.",
                "Completes tasks in accordance with plans.",
                "Monitors the attainment of own work objectives and/or quality of the work completed.",
                "Sets priorities for tasks in order of importance.",
              ],
            },
            {
              proficiency: "Applies planning principles to achieve work goals.",
              behaviors: [
                "Establishes goals and organizes work by bringing together the necessary resources.",
                "Organizes work according to project and time management principles and processes.",
                "Practices and plans for contingencies to deal with unexpected events or setbacks.",
                "Makes needed adjustments to timelines, steps and resource allocation.",
                "Directs issues to appropriate bodies when unable to resolve them within own area of responsibility.",
              ],
            },
            {
              proficiency: "Develops plans for the business unit.",
              behaviors: [
                "Considers a range of factors in the planning process (e.g., costs, timing, customer needs, resources available, etc.).",
                "Identifies and plans activities that will result in overall improvement to services.",
                "Challenges inefficient or ineffective work processes and offers constructive alternatives.",
                "Anticipates issues and revise plans as required.",
                "Helps to remove barriers by providing resources and encouragement as needed.",
              ],
            },
            {
              proficiency:
                "Integrates and evaluates plans to achieve business goals.",
              behaviors: [
                "Establishes alternative courses of action, organizes people and prioritizes the activities of the team to achieve results more effectively.",
                "Ensures that systems are in place to effectively monitor and evaluate progress.",
                "Evaluates processes and results and makes appropriate adjustments to the plan.",
                "Sets, communicates and regularly assesses priorities.",
              ],
            },
            {
              proficiency: "Plans and organizes at a strategic level.",
              behaviors: [
                "Develops strategic plans considering short-term requirements as well as long-term direction.",
                "Plans work and deploys resources to deliver organization-wide results.",
                "Secures and allocates program or project resources in line with strategic direction.",
                "Sets and communicates priorities within the broader organization.",
                "Ensures sufficient resources are available to achieve set objectives.",
              ],
            },
          ],
        },
        {
          title: "Decision-Making",
          description:
            "Making decisions and solving problems involving varied levels of complexity, ambiguity and risk.",
          levels: [
            {
              proficiency: "Makes decisions based solely on rules.",
              behaviors: [
                "Makes straightforward decisions based on pre-defined options using clear criteria/procedures.",
                "Consults with others or refers an issue/situation for resolution when criteria are not clear.",
                "Deals with exceptions within established parameters using clearly specified rules and procedures.",
                "Makes decisions involving little or no consequence of error.",
                "Verifies that the decision/resolution is correct.",
              ],
            },
            {
              proficiency: "Makes decisions by interpreting rules.",
              behaviors: [
                "Applies guidelines and procedures that require some interpretation when dealing with exceptions.",
                "Makes straight - forward decisions based on information that is generally clear and adequate.",
                "Considers the risks and consequences of action and/or decisions.",
                "Makes decisions involving minor consequence of error.",
                "Seeks guidance as needed when the situation is unclear.",
              ],
            },
            {
              proficiency:
                "Makes decisions in situations where there is scope for interpretation of rules.",
              behaviors: [
                "Applies guidelines and procedures that leave considerable room for discretion and interpretation.",
                "Makes decisions by weighing several factors, some of which are partially defined and entail missing pieces of critical information.",
                "As needed, involves the right people in the decision-making process.",
                "Balances the risks and implications of decisions across multiple issues.",
                "Develops solutions that address the root cause of the problem and prevent recurrence.",
                "Recognizes, analyzes and solves problems across projects and in complex situations.",
              ],
            },
            {
              proficiency: "Makes complex decisions in the absence of rules.",
              behaviors: [
                "Simplifies complex information from multiple sources to resolve issues.",
                "Makes complex decisions for which there are no set procedures.",
                "Considers a multiplicity of interrelated factors for which there is incomplete and contradictory information.",
                "Balances competing priorities in reaching decisions.",
                "Develops solutions to problems, balancing the risks and implications across multiple projects.",
                "Recommends solutions in an environment of risk and ambiguity.",
              ],
            },
            {
              proficiency:
                "Makes high-risk decisions in complex and ambiguous situations.",
              behaviors: [
                "Makes high-risk strategic decisions that have significant consequences.",
                "Balances a commitment to excellence with the best interests of clients and the organization whenmaking decisions.",
                "Uses principles, values and sound business sense to make decisions.",
                "Makes decisions in a volatile environment in which weight given to any factor can change rapidly.",
                "Reaches decisions assuredly in an environment of public scrutiny.",
                "Assesses external and internal environments in order to make a well-informed decision.",
                "Identifies the problem based on many factors, often complex and sweeping, difficult to define and contradictory (e.g., fiscal responsibility, the public good).",
              ],
            },
          ],
        },
        {
          title: "Analytical Thinking",
          description:
            "Interpreting, linking, and analyzing information in order to understand issues.",
          levels: [
            {
              proficiency: "Analyzes and synthesizes information.",
              behaviors: [
                "Breaks down concrete issues into parts and synthesizes succinctly.",
                "Collects and analyses information from a variety of appropriate sources.",
                "Identifies the links between situations and information.",
              ],
            },
            {
              proficiency: "Identifies critical relationships.",
              behaviors: [
                "Sees connections, patterns or trends in the information available.",
                "Identifies the implications and possible consequences of trends or events.",
                "Draws logical conclusions, providing options and recommendations.",
              ],
            },
            {
              proficiency: "Analyses complex relationships.",
              behaviors: [
                "Analyses complex situations, breaking each into its constituent parts.",
                "Recognizes and assesses several likely causal factors or ways of interpreting the information available.",
                "Identifies connections between situations that are not obviously related.",
              ],
            },
            {
              proficiency: "Applies broad analysis.",
              behaviors: [
                "Integrates information from diverse sources, often involving large amounts of information.",
                "Thinks several steps ahead in deciding on best course of action, anticipating likely outcomes.",
                "Develops and recommends policy framework based on analysis of emerging trends.",
                "Gathers information from many sources, including experts, in order to completely understand a problem/situation.",
              ],
            },
            {
              proficiency:
                "Applies a systems perspective to the analysis of enterprise-wide issues.",
              behaviors: [
                "Identifies multiple relationships and disconnects in processes in order to identify options and reach conclusions.",
                "Adopts a systems perspective, assessing and balancing vast amounts of diverse information on the varied systems and sub-systems that comprise and affect the working environment.",
                "Thinks beyond the organization and into the future, balancing multiple perspectives when setting direction or reaching conclusions (e.g., social, economic, partner, stakeholder interests, short- and longterm benefits, national and global implications).",
              ],
            },
          ],
        },
        {
          title: "Results Orientation",
          description:
            "Focusing personal efforts on achieving results consistent with the organization’s objectives.",
          levels: [
            {
              proficiency: "Strives to meet work expectations.",
              behaviors: [
                "Sets goals and works to meet established expectations; maintains performance levels.",
                "Pursues organizational objectives with energy and persistence. Sets high personal standards for performance.",
                "Adapts working methods in order to achieve objectives.",
                "Accepts ownership of and responsibility for own work.",
              ],
            },
            {
              proficiency: "Consistently meets established expectations.",
              behaviors: [
                "Consistently achieves established expectations through personal commitment.",
                "Makes adjustments to activities/processes based on feedback.",
              ],
            },
            {
              proficiency: "Surpasses established expectations.",
              behaviors: [
                "Exceeds current expectations and pushes for improved results in own performance.",
                "Takes on new roles and responsibilities when faced with unexpected changes.",
              ],
            },
            {
              proficiency: "Seeks out significant challenges.",
              behaviors: [
                "Seeks significant challenges outside of current job scope.",
                "Works on new projects or assignments that add value without compromising current accountabilities.",
                "Guides staff to achieve tasks, goals, processes and performance standards.",
              ],
            },
            {
              proficiency: "Pursues excellence on an organizational level.",
              behaviors: [
                "Models excellence and motivates fellow organizational members to follow his/her example.",
                "Encourages constructive questioning of policies and practices; sponsors experimentation and innovation.",
                "Holds staff accountable for achieving standards of excellence and results for the organization.",
              ],
            },
          ],
        },
        {
          title: "Teamwork",
          description:
            "Working collaboratively with others to achieve common goals and positive results.",
          levels: [
            {
              proficiency: "Participates as a team member.",
              behaviors: [
                "Assumes personal responsibility and follows up to meet commitments to others.",
                "Understands the goals of the team and each team member’s role within it.",
                "Deals honestly and fairly with others, showing consideration and respect.",
                "Willingly gives support to co-workers and works collaboratively rather than competitively.",
                "Shares experiences, knowledge and best practices with team members.",
              ],
            },
            {
              proficiency: "Fosters teamwork.",
              behaviors: [
                "Assumes responsibility for work activities and coordinating efforts.",
                "Promotes team goals.",
                "Seeks others’ input and involvement and listens to their viewpoints.",
                "Shifts priorities, changes style and responds with new approaches as needed to meet team goals.",
                "Suggests or develops methods and means for maximizing the input and involvement of team members.",
                "Acknowledges the work of others.",
              ],
            },
            {
              proficiency: "Demonstrates leadership in teams",
              behaviors: [
                "Builds relationships with team members and with other work units.",
                "Fosters team spirit and collaboration within teams .",
                "Discusses problems/ issues with team members that could affect results.",
                "Communicates expectations for teamwork and collaboration.",
                "Facilitates the expression of diverse points of view to enhance teamwork.",
                "Capitalizes on the strengths of all members.",
                "Gives credit for success and acknowledges contributions and efforts of individuals to team effectiveness.",
              ],
            },
            {
              proficiency: "Capitalizes on teamwork opportunities.",
              behaviors: [
                "Initiates collaboration with other groups/ organizations on projects or methods of operating.",
                "Capitalizes on opportunities and addresses challenges presented by the diversity of team talents.",
                "Supports and encourages other team members to achieve objectives.",
                "Encourages others to share experience, knowledge and best practices with the team.",
                "Encourages the team to openly discuss what can be done to create a solution or alternative.",
              ],
            },
            {
              proficiency: "Builds bridges between teams.",
              behaviors: [
                "Facilitates collaboration across the organization and with other organizations to achieve a common goal.",
                "Builds strong teams that capitalize on differences in expertise, competencies and background.",
                "Breaks down barriers (structural, functional, cultural) between teams, facilitating the sharing of expertise and resources.",
              ],
            },
          ],
        },
        {
          title: "Values and Ethics",
          description:
            "Fostering and supporting the principles and values of the organization and public service as a whole.",
          levels: [
            {
              proficiency:
                "Demonstrates behaviors consistent with the organization’s values.",
              behaviors: [
                "Treats others fairly and with respect.",
                "Takes responsibility for own work, including problems and issues.",
                "Uses applicable professional standards and established procedures, policies and/or legislation when taking action and making decisions.",
                "Identifies ethical dilemmas and conflict of interest situations and takes action to avoid and prevent them.",
                "Anticipates and prevents breaches in confidentiality and/or security.",
              ],
            },
            {
              proficiency: "Identifies ethical implications.",
              behaviors: [
                "Identifies and considers different ethical aspects of a situation when making decisions.",
                "Identifies and balances competing values when selecting approaches or recommendations for dealing with a situation.",
              ],
            },
            {
              proficiency: "Aligns team with organization’s values and ethics.",
              behaviors: [
                "Fosters a climate of trust within the work team.",
                "Implements processes and structures to deal with difficulties in confidentiality and/or security.",
                "Ensures that decisions take into account ethics and values of the organization and Public Service as a whole.",
                "Interacts with others fairly and objectively.",
              ],
            },
            {
              proficiency: "Promotes the organization’s values and ethics.",
              behaviors: [
                "Advises others in maintaining fair and consistent dealings with others and in dealing with ethical dilemmas.",
                "Deals directly and constructively with lapses of integrity (e.g., intervenes in a timely fashion to remind others of the need to respect the dignity of others).",
              ],
            },
            {
              proficiency:
                "Exemplifies and demonstrates the organization’s values and ethics.",
              behaviors: [
                "Defines, communicates and consistently exemplifies the organization’s values and ethics.",
                "Ensures that standards and safeguards are in place to protect the organization’s integrity (e.g., professional standards for financial reporting, integrity/ security of information systems).",
                "Identifies underlying issues that impact negatively on people and takes appropriate action to rectify the issues (e.g., systemic discrimination).",
              ],
            },
          ],
        },
        {
          title: "Visioning and Strategic Direction",
          description:
            "Developing and inspiring commitment to a vision of success; supporting, promoting and ensuring alignment with the organization’s vision and values.",
          levels: [
            {
              proficiency: "Demonstrates personal work alignment.",
              behaviors: [
                "Sets personal work goals in line with operational goals of work area.",
                "Continually evaluates personal progress and actions to ensure alignment with organizational vision and operational goals.",
                "Liaises with others to ensure alignment with the business goals and vision of the organization.",
              ],
            },
            {
              proficiency: "Promotes team alignment.",
              behaviors: [
                "Effectively communicates and interprets the strategic vision to employees within area of responsibility.",
                "Clearly articulates and promotes the significance and impact of employee contributions to promoting and achieving organizational goals.",
                "Monitors work of team to ensure alignment with strategic direction, vision and values for the organization.",
                "Identifies potential future directions for work area in line with vision.",
                "Proactively helps others to understand the importance of the strategy and vision.",
              ],
            },
            {
              proficiency: "Aligns program/operational goals and plans.",
              behaviors: [
                "Works with teams to set program/operational goals and plans in keeping with the strategic direction.",
                "Regularly promotes the organization, its vision and values to clients, stakeholders and partners.",
                "Works with staff to set strategic goals for own sector of the organization.",
                "Assesses the gap between the current state and desired future direction and establishes effective ways for closing the gap in own sector.",
              ],
            },
            {
              proficiency: "Influences strategic direction.",
              behaviors: [
                "Foresees obstacles and opportunities for the organization and acts accordingly.",
                "Defines issues, generates options and selects solutions, which are consistent with the strategy and vision.",
                "Scans, seeks out and assesses information on potential future directions.",
                "Provides direction and communicates the vision to encourage alignment within the organization.",
                "Energetically and persistently promotes strategic objectives with colleagues in other business lines.",
              ],
            },
            {
              proficiency: "Develops vision.",
              behaviors: [
                "Leads the development of the vision for the organization.",
                "Defines and continuously articulates the vision and strategy in the context of wider government priorities.",
                "Describes the vision and values in compelling terms to develop understanding and promote acceptance/ commitment among staff and stakeholders.",
                "Identifies, conceptualizes and synthesizes new trends or connections between organizational issues and translates them into priorities for the organization.",
              ],
            },
          ],
        },
      ],
      // end of competencies
    };
  },
};
</script>

