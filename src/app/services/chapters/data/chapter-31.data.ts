
import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_31_DATA: Chapter = {
  id: 31,
  title: 'AI Interview Practice Companion',
  description: 'Build an AI-powered interview practice system with technical & behavioral questions, voice interaction, real-time feedback, coding challenges, system design mode, multi-dimensional scoring, and performance analytics to prepare for real-world interviews.',
  icon: 'people-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  demoRoute: '/demo/31',
  sections: [
    {
      id: 310,
      title: 'Interview Practice Architecture',
      content: `
        <h2>Building an AI Interview Practice System</h2>
        <p>An effective interview practice platform provides realistic simulation, constructive feedback, and measurable improvement tracking. It covers multiple interview formats (technical, behavioral, coding, system design) and adapts to the user's skill level.</p>

        <h3>Key Components</h3>
        <ul>
          <li><strong>Session Management:</strong> Track interview sessions with state, questions, responses, and scores</li>
          <li><strong>Question Bank:</strong> Curated and AI-generated questions across domains and difficulty levels</li>
          <li><strong>Evaluation Engine:</strong> AI-powered answer assessment with multi-dimensional scoring</li>
          <li><strong>Feedback System:</strong> Constructive, actionable feedback with improvement suggestions</li>
          <li><strong>Analytics:</strong> Track progress and improvement over time with detailed metrics</li>
          <li><strong>Adaptive Difficulty:</strong> Adjust question difficulty based on performance</li>
        </ul>

        <h3>Interview Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Focus</th>
            <th>Duration</th>
          </tr>
          <tr>
            <td>Technical Concept</td>
            <td>Knowledge, understanding, explanation</td>
            <td>2-5 min per question</td>
          </tr>
          <tr>
            <td>Behavioral</td>
            <td>STAR method, experiences, soft skills</td>
            <td>3-5 min per question</td>
          </tr>
          <tr>
            <td>Coding Challenge</td>
            <td>Algorithm, data structures, problem-solving</td>
            <td>30-45 min</td>
          </tr>
          <tr>
            <td>System Design</td>
            <td>Architecture, scalability, trade-offs</td>
            <td>30-45 min</td>
          </tr>
          <tr>
            <td>Mock Full Interview</td>
            <td>Complete simulation (all types)</td>
            <td>45-60 min</td>
          </tr>
        </table>

        <h3>Session Lifecycle</h3>
        <ol>
          <li><strong>Setup:</strong> Select type, domain, difficulty, duration</li>
          <li><strong>Start:</strong> Begin session, start timer</li>
          <li><strong>Question Delivery:</strong> Present questions sequentially</li>
          <li><strong>Answer Recording:</strong> Text or voice input</li>
          <li><strong>Real-Time Evaluation:</strong> AI analysis as user answers</li>
          <li><strong>Completion:</strong> Generate comprehensive score and feedback</li>
          <li><strong>Analytics:</strong> Update progress tracking and recommendations</li>
        </ol>

        <h3>Difficulty Levels</h3>
        <ul>
          <li><strong>Junior (0-2 years):</strong> Fundamentals, basic concepts, entry-level problems</li>
          <li><strong>Mid (2-5 years):</strong> Applied knowledge, common patterns, moderate complexity</li>
          <li><strong>Senior (5-8 years):</strong> Advanced topics, architecture, best practices, optimization</li>
          <li><strong>Staff (8+ years):</strong> System design, leadership, trade-offs, strategic thinking</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Interview Session Model',
          code: `// src/app/models/interview-session.interface.ts
export interface InterviewSession {
  id: string;
  userId: string;
  type: InterviewType;
  domain: InterviewDomain;
  difficulty: DifficultyLevel;
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  startTime: Date;
  endTime?: Date;
  duration?: number; // seconds
  overallScore?: number;
  categoryScores?: CategoryScores;
  feedback?: InterviewFeedback;
  status: SessionStatus;
  config: SessionConfig;
}

export type InterviewType =
  | 'technical-concept'
  | 'behavioral'
  | 'coding-challenge'
  | 'system-design'
  | 'mock-full';

export type InterviewDomain =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'fullstack'
  | 'devops'
  | 'general';

export type DifficultyLevel =
  | 'junior'      // 0-2 years
  | 'mid'         // 2-5 years
  | 'senior'      // 5-8 years
  | 'staff';      // 8+ years

export type SessionStatus =
  | 'setup'
  | 'in-progress'
  | 'paused'
  | 'completed'
  | 'abandoned';

export interface SessionConfig {
  timeLimit?: number; // seconds per question or total
  voiceEnabled: boolean;
  hintsEnabled: boolean;
  maxHints?: number;
  interviewerPersona?: 'friendly' | 'neutral' | 'tough';
  realTimeFeedback: boolean;
  autoAdvance: boolean;
}

export interface CategoryScores {
  technicalKnowledge: number;
  problemSolving: number;
  communication: number;
  codeQuality: number;
  systemsThinking: number;
  behavioral: number;
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Interview Session Manager Service',
          code: `// src/app/services/interview-session-manager.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewSessionManager {
  private currentSession$ = new BehaviorSubject<InterviewSession | null>(null);
  private sessionTimer$ = new BehaviorSubject<number>(0);
  private timerSubscription: any;

  constructor(
    private questionBank: QuestionBankService,
    private storage: StorageService
  ) {}

  async createSession(config: {
    type: InterviewType;
    domain: InterviewDomain;
    difficulty: DifficultyLevel;
    questionCount: number;
    sessionConfig: SessionConfig;
  }): Promise<InterviewSession> {
    const questions = await this.questionBank.getQuestions({
      domains: [config.domain],
      difficulties: [this.difficultyToNumber(config.difficulty)],
      types: [config.type],
      limit: config.questionCount,
      excludeAsked: await this.getRecentlyAskedQuestions()
    });

    const session: InterviewSession = {
      id: this.generateId(),
      userId: await this.getUserId(),
      type: config.type,
      domain: config.domain,
      difficulty: config.difficulty,
      questions,
      responses: [],
      startTime: new Date(),
      status: 'setup',
      config: config.sessionConfig
    };

    await this.saveSession(session);
    this.currentSession$.next(session);
    return session;
  }

  async startSession(sessionId: string): Promise<void> {
    const session = this.currentSession$.value;
    if (!session || session.id !== sessionId) {
      throw new Error('Invalid session');
    }

    session.status = 'in-progress';
    session.startTime = new Date();
    this.currentSession$.next(session);
    await this.saveSession(session);
    this.startTimer();
  }

  async submitAnswer(
    questionId: string,
    answer: string,
    answerType: 'text' | 'voice' | 'code' | 'diagram',
    metadata?: any
  ): Promise<InterviewResponse> {
    const session = this.currentSession$.value;
    if (!session) throw new Error('No active session');

    const question = session.questions.find(q => q.id === questionId);
    if (!question) throw new Error('Question not found');

    const startTime = this.getQuestionStartTime(questionId);
    const endTime = new Date();
    const responseTime = (endTime.getTime() - startTime.getTime()) / 1000;

    const evaluation = await this.evaluateAnswer(question, answer, {
      responseTime,
      voiceAnalysis: metadata?.voiceAnalysis,
      codeAnalysis: metadata?.codeAnalysis
    });

    const response: InterviewResponse = {
      id: this.generateId(),
      sessionId: session.id,
      questionId,
      answer,
      answerType,
      startTime,
      endTime,
      responseTime,
      evaluation,
      voiceAnalysis: metadata?.voiceAnalysis,
      codeAnalysis: metadata?.codeAnalysis,
      hintsUsed: metadata?.hintsUsed || 0
    };

    session.responses.push(response);
    this.currentSession$.next(session);
    await this.saveSession(session);

    return response;
  }

  async completeSession(): Promise<InterviewScore> {
    const session = this.currentSession$.value;
    if (!session) throw new Error('No active session');

    session.endTime = new Date();
    session.duration = (session.endTime.getTime() - session.startTime.getTime()) / 1000;
    session.status = 'completed';
    this.stopTimer();

    const score = await this.calculateSessionScore(session);
    session.overallScore = score.overall;
    session.categoryScores = score.categories;
    session.feedback = this.generateFeedback(session, score);

    this.currentSession$.next(session);
    await this.saveSession(session);
    await this.updateAnalytics(session, score);

    return score;
  }

  getCurrentSession(): Observable<InterviewSession | null> {
    return this.currentSession$.asObservable();
  }

  getSessionTimer(): Observable<number> {
    return this.sessionTimer$.asObservable();
  }

  getCurrentQuestion(): InterviewQuestion | null {
    const session = this.currentSession$.value;
    if (!session) return null;

    const answeredCount = session.responses.length;
    return session.questions[answeredCount] || null;
  }

  getProgress(): number {
    const session = this.currentSession$.value;
    if (!session || session.questions.length === 0) return 0;

    return (session.responses.length / session.questions.length) * 100;
  }

  private startTimer(): void {
    let seconds = 0;
    this.timerSubscription = interval(1000).subscribe(() => {
      seconds++;
      this.sessionTimer$.next(seconds);
    });
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  private generateId(): string {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  private difficultyToNumber(difficulty: DifficultyLevel): number {
    const map: Record<DifficultyLevel, number> = {
      junior: 3,
      mid: 5,
      senior: 7,
      staff: 9
    };
    return map[difficulty];
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Session lifecycle: Setup → Start (timer begins) → Question delivery → Answer recording → Evaluation → Complete → Analytics',
        'Multi-type support: Technical (knowledge), behavioral (STAR), coding (algorithms), system design (architecture), mock (full simulation)',
        'State management: Use observables for reactive updates, persist session frequently to prevent data loss, handle pause/resume',
        'Progress tracking: Calculate percentage based on answered vs total questions, show time elapsed, provide question-by-question feedback',
        'Difficulty levels: Map to years of experience (junior 0-2, mid 2-5, senior 5-8, staff 8+), adjust question complexity accordingly',
      ],
    },
    {
      id: 311,
      title: 'Question Bank Management',
      content: `
        <h2>Question Bank Architecture</h2>
        <p>A robust question bank combines curated high-quality questions with AI-generated questions to provide variety and avoid repetition. Questions are tagged, tracked for effectiveness, and continuously improved based on user feedback.</p>

        <h3>Question Sources</h3>
        <ul>
          <li><strong>Curated:</strong> Hand-crafted questions based on real interviews at top companies</li>
          <li><strong>AI-Generated:</strong> Dynamically created questions using AI prompts with specific parameters</li>
          <li><strong>User-Submitted:</strong> Community-contributed questions (moderated for quality)</li>
        </ul>

        <h3>Question Metadata</h3>
        <table>
          <tr>
            <th>Field</th>
            <th>Purpose</th>
          </tr>
          <tr>
            <td>Effectiveness</td>
            <td>0-1 score based on user ratings and outcomes</td>
          </tr>
          <tr>
            <td>Times Asked</td>
            <td>Usage count for popularity tracking</td>
          </tr>
          <tr>
            <td>Average Score</td>
            <td>Mean score across all attempts</td>
          </tr>
          <tr>
            <td>Average Response Time</td>
            <td>Typical time to answer</td>
          </tr>
          <tr>
            <td>Company</td>
            <td>Company-specific question style (FAANG, startup, etc.)</td>
          </tr>
        </ul>

        <h3>Question Selection Strategy</h3>
        <ol>
          <li>Filter by domain, type, and difficulty</li>
          <li>Exclude recently asked questions (avoid repetition)</li>
          <li>Shuffle remaining questions for randomness</li>
          <li>If not enough questions, generate with AI</li>
          <li>Update question metrics after each use</li>
        </ol>

        <h3>AI Question Generation</h3>
        <p>Use structured prompts to generate questions with:</p>
        <ul>
          <li>Clear question statement</li>
          <li>Expected key points in the answer</li>
          <li>Evaluation criteria with weights</li>
          <li>Follow-up questions</li>
          <li>Tags for categorization</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 3,
          language: 'typescript',
          title: 'Question Bank Service',
          code: `// src/app/services/question-bank.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface QuestionCriteria {
  domains: string[];
  difficulties: number[];
  types: string[];
  companies?: string[];
  limit: number;
  excludeAsked?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private questions$ = new BehaviorSubject<InterviewQuestion[]>([]);

  constructor(
    private http: HttpClient,
    private aiService: AIService,
    private storage: StorageService
  ) {
    this.loadQuestions();
  }

  async getQuestions(criteria: QuestionCriteria): Promise<InterviewQuestion[]> {
    let allQuestions = this.questions$.value;

    // Filter by domains
    if (criteria.domains && criteria.domains.length > 0) {
      allQuestions = allQuestions.filter(q =>
        criteria.domains!.includes(q.domain)
      );
    }

    // Filter by types
    if (criteria.types && criteria.types.length > 0) {
      allQuestions = allQuestions.filter(q =>
        criteria.types!.includes(q.type)
      );
    }

    // Filter by difficulty range
    if (criteria.difficulties && criteria.difficulties.length > 0) {
      allQuestions = allQuestions.filter(q =>
        criteria.difficulties!.some(d => Math.abs(q.difficulty - d) <= 1)
      );
    }

    // Filter by company
    if (criteria.companies && criteria.companies.length > 0) {
      allQuestions = allQuestions.filter(q =>
        q.company && criteria.companies!.includes(q.company)
      );
    }

    // Exclude recently asked
    if (criteria.excludeAsked && criteria.excludeAsked.length > 0) {
      allQuestions = allQuestions.filter(q =>
        !criteria.excludeAsked!.includes(q.id)
      );
    }

    // Shuffle and limit
    const shuffled = this.shuffleArray(allQuestions);
    let selected = shuffled.slice(0, criteria.limit);

    // If not enough questions, generate with AI
    if (selected.length < criteria.limit) {
      const needed = criteria.limit - selected.length;
      const generated = await this.generateQuestionsWithAI(criteria, needed);
      selected = [...selected, ...generated];
    }

    return selected;
  }

  async generateQuestion(
    domain: string,
    difficulty: number,
    type: string,
    context?: { topic?: string; company?: string }
  ): Promise<InterviewQuestion> {
    const prompt = this.buildGenerationPrompt(domain, difficulty, type, context);

    const aiResponse = await this.aiService.generateCompletion({
      prompt,
      temperature: 0.7,
      maxTokens: 1000
    });

    const questionData = this.parseAIQuestionResponse(aiResponse);

    const question: InterviewQuestion = {
      id: this.generateId(),
      type,
      domain,
      subDomain: context?.topic,
      difficulty,
      question: questionData.question,
      context: questionData.context,
      expectedKeyPoints: questionData.keyPoints,
      evaluationCriteria: questionData.criteria,
      followUps: questionData.followUps,
      tags: questionData.tags,
      company: context?.company,
      metadata: {
        createdAt: new Date(),
        source: 'ai-generated',
        timesAsked: 0,
        lastUpdated: new Date()
      }
    };

    await this.addQuestion(question);
    return question;
  }

  async updateQuestionMetrics(
    questionId: string,
    metrics: { responseTime?: number; score?: number; userFeedback?: number }
  ): Promise<void> {
    const questions = this.questions$.value;
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    question.metadata.timesAsked++;

    if (metrics.responseTime) {
      const current = question.metadata.avgResponseTime || 0;
      const count = question.metadata.timesAsked;
      question.metadata.avgResponseTime =
        (current * (count - 1) + metrics.responseTime) / count;
    }

    if (metrics.score !== undefined) {
      const current = question.metadata.avgScore || 0;
      const count = question.metadata.timesAsked;
      question.metadata.avgScore =
        (current * (count - 1) + metrics.score) / count;
    }

    if (metrics.userFeedback !== undefined) {
      const current = question.metadata.effectiveness || 0;
      const count = question.metadata.timesAsked;
      question.metadata.effectiveness =
        (current * (count - 1) + (metrics.userFeedback / 5)) / count;
    }

    question.metadata.lastUpdated = new Date();
    this.questions$.next(questions);
    await this.storage.updateQuestion(question);
  }

  private async loadQuestions(): Promise<void> {
    const curated = await this.storage.getCuratedQuestions();
    const custom = await this.storage.getCustomQuestions();
    this.questions$.next([...curated, ...custom]);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private generateId(): string {
    return \`q-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Question filtering: Domain, type, difficulty, company; exclude recently asked to avoid repetition',
        'AI generation: Use structured prompts with topic, difficulty, and expected format; validate and store generated questions',
        'Metrics tracking: Effectiveness (user ratings), times asked (popularity), avg score, avg response time',
        'Selection strategy: Filter → Shuffle → Limit; generate with AI if not enough matches',
        'Quality control: Track effectiveness, remove low-performing questions, validate AI-generated content',
      ],
    },
    {
      id: 312,
      title: 'Technical Interview Questions',
      content: `
        <h2>Technical Question Categories</h2>
        <p>Technical interview questions assess knowledge, understanding, and application of technologies. They range from fundamentals (closures, event loop) to advanced topics (performance optimization, architecture patterns).</p>

        <h3>Question Domains</h3>
        <table>
          <tr>
            <th>Domain</th>
            <th>Topics</th>
          </tr>
          <tr>
            <td>JavaScript/TypeScript</td>
            <td>Closures, prototypes, async/await, event loop, promises, modules, generics, decorators</td>
          </tr>
          <tr>
            <td>Angular/Ionic</td>
            <td>Dependency injection, change detection, lifecycle hooks, directives, pipes, routing, forms</td>
          </tr>
          <tr>
            <td>RxJS</td>
            <td>Observables, operators, subjects, subscription management, error handling, multicasting</td>
          </tr>
          <tr>
            <td>State Management</td>
            <td>NgRx store, effects, selectors, entities, Redux pattern, state architecture</td>
          </tr>
          <tr>
            <td>Performance</td>
            <td>Lazy loading, change detection optimization, bundle size, virtual scrolling, OnPush strategy</td>
          </tr>
          <tr>
            <td>Security</td>
            <td>XSS, CSRF, authentication, authorization, HTTPS, Content Security Policy</td>
          </tr>
        </table>

        <h3>Question Formats</h3>
        <ul>
          <li><strong>Conceptual:</strong> "Explain X" - tests understanding</li>
          <li><strong>Comparison:</strong> "Difference between X and Y" - tests nuanced knowledge</li>
          <li><strong>Code Output:</strong> "What does this code output?" - tests practical understanding</li>
          <li><strong>Debugging:</strong> "What's wrong with this code?" - tests problem-solving</li>
          <li><strong>Architecture:</strong> "How would you design X?" - tests systems thinking</li>
        </ul>

        <h3>Evaluation Criteria</h3>
        <p>Multi-dimensional scoring across:</p>
        <ul>
          <li><strong>Technical Accuracy (40%):</strong> Correct information, key points covered</li>
          <li><strong>Communication (20%):</strong> Clarity, structure, conciseness</li>
          <li><strong>Completeness (20%):</strong> All required elements addressed</li>
          <li><strong>Depth (20%):</strong> Goes beyond surface-level, provides examples, discusses trade-offs</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 4,
          language: 'typescript',
          title: 'Curated Technical Questions Example',
          code: `// Curated technical questions with detailed evaluation criteria
export const CURATED_TECHNICAL_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'js-closures-001',
    type: 'technical-concept',
    domain: 'frontend',
    subDomain: 'javascript',
    difficulty: 4,
    question: 'Explain how closures work in JavaScript. Provide an example where closures are particularly useful.',
    expectedKeyPoints: [
      'Function bundled with lexical environment',
      'Access to outer scope variables',
      'Data privacy/encapsulation',
      'Practical use case example'
    ],
    evaluationCriteria: {
      technicalAccuracy: {
        weight: 0.4,
        keyPoints: [
          'Mentions lexical scoping',
          'Explains variable retention',
          'Describes closure creation'
        ]
      },
      communication: {
        weight: 0.2,
        aspects: ['clarity', 'structure']
      },
      completeness: {
        weight: 0.2,
        requiredElements: ['Definition', 'Example', 'Use case']
      },
      depth: {
        weight: 0.2,
        expectedDetails: ['Memory implications', 'Common patterns']
      }
    },
    followUps: [
      {
        question: 'What are potential memory leaks with closures and how do you prevent them?',
        trigger: 'if-correct',
        depth: 'deep'
      }
    ],
    tags: ['javascript', 'closures', 'scoping', 'fundamentals'],
    metadata: {
      createdAt: new Date('2024-01-01'),
      source: 'curated',
      effectiveness: 0.85,
      avgResponseTime: 180,
      avgScore: 72,
      timesAsked: 150,
      lastUpdated: new Date('2024-01-01')
    }
  },

  {
    id: 'ng-change-detection-001',
    type: 'technical-concept',
    domain: 'frontend',
    subDomain: 'angular',
    difficulty: 6,
    question: 'Explain Angular change detection. What is the difference between Default and OnPush strategies?',
    expectedKeyPoints: [
      'Zone.js and change detection cycle',
      'Default strategy checks all components',
      'OnPush only checks on input changes or events',
      'Performance implications'
    ],
    evaluationCriteria: {
      technicalAccuracy: {
        weight: 0.5,
        keyPoints: [
          'Explains Zone.js role',
          'Describes both strategies',
          'Performance trade-offs'
        ]
      },
      communication: {
        weight: 0.2,
        aspects: ['clarity', 'structure']
      },
      completeness: {
        weight: 0.15,
        requiredElements: ['Default behavior', 'OnPush behavior', 'When to use each']
      },
      depth: {
        weight: 0.15,
        expectedDetails: ['Immutability', 'ChangeDetectorRef']
      }
    },
    followUps: [
      {
        question: 'How do you manually trigger change detection?',
        trigger: 'always',
        depth: 'intermediate'
      }
    ],
    tags: ['angular', 'change-detection', 'performance', 'onpush'],
    company: 'Google',
    metadata: {
      createdAt: new Date('2024-01-01'),
      source: 'curated',
      effectiveness: 0.90,
      avgResponseTime: 240,
      avgScore: 65,
      timesAsked: 200,
      lastUpdated: new Date('2024-01-01')
    }
  },

  {
    id: 'rxjs-operators-001',
    type: 'technical-concept',
    domain: 'frontend',
    subDomain: 'rxjs',
    difficulty: 5,
    question: 'Explain the difference between switchMap, mergeMap, and concatMap. When would you use each?',
    expectedKeyPoints: [
      'switchMap cancels previous',
      'mergeMap runs concurrently',
      'concatMap waits for completion',
      'Use case examples'
    ],
    evaluationCriteria: {
      technicalAccuracy: {
        weight: 0.5,
        keyPoints: [
          'Explains each operator',
          'Describes cancellation behavior',
          'Provides use cases'
        ]
      },
      communication: {
        weight: 0.2,
        aspects: ['clarity', 'structure']
      },
      completeness: {
        weight: 0.15,
        requiredElements: ['All three operators', 'Differences', 'Use cases']
      },
      depth: {
        weight: 0.15,
        expectedDetails: ['Memory implications', 'Error handling']
      }
    },
    followUps: [
      {
        question: 'What happens to pending observables when switchMap cancels?',
        trigger: 'if-correct',
        depth: 'deep'
      }
    ],
    tags: ['rxjs', 'operators', 'flattening', 'async'],
    company: 'Amazon',
    metadata: {
      createdAt: new Date('2024-01-01'),
      source: 'curated',
      effectiveness: 0.87,
      avgResponseTime: 220,
      avgScore: 66,
      timesAsked: 140,
      lastUpdated: new Date('2024-01-01')
    }
  }
];`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Technical question types: Conceptual (explain X), comparison (X vs Y), code output (debugging), architecture (design X)',
        'Evaluation dimensions: Technical accuracy (40% - correctness), communication (20% - clarity), completeness (20% - coverage), depth (20% - details)',
        'Expected key points: List 3-5 critical concepts that answer must cover; missing key points indicates gaps in knowledge',
        'Follow-up questions: Probe deeper understanding (if-correct), clarify confusion (if-incorrect), or always ask (always)',
        'Company-specific: Tag questions with company style (Google = design, Amazon = scale, Facebook = trade-offs)',
      ],
    },
    {
      id: 313,
      title: 'Behavioral Interview Questions',
      content: `
        <h2>STAR Method for Behavioral Questions</h2>
        <p>Behavioral questions assess soft skills, experiences, and culture fit. The STAR method (Situation, Task, Action, Result) provides a structured framework for answering these questions effectively.</p>

        <h3>STAR Method Components</h3>
        <table>
          <tr>
            <th>Component</th>
            <th>Purpose</th>
            <th>Time Allocation</th>
          </tr>
          <tr>
            <td>Situation</td>
            <td>Set the scene and context</td>
            <td>15-20%</td>
          </tr>
          <tr>
            <td>Task</td>
            <td>Describe responsibility or challenge</td>
            <td>10-15%</td>
          </tr>
          <tr>
            <td>Action</td>
            <td>Explain specific steps taken</td>
            <td>50-60%</td>
          </tr>
          <tr>
            <td>Result</td>
            <td>Share outcome and learning</td>
            <td>15-20%</td>
          </tr>
        </table>

        <h3>Behavioral Question Categories</h3>
        <ul>
          <li><strong>Leadership:</strong> Leading teams, mentoring, decision-making</li>
          <li><strong>Conflict Resolution:</strong> Disagreements, difficult conversations, compromise</li>
          <li><strong>Problem-Solving:</strong> Debugging, troubleshooting, creative solutions</li>
          <li><strong>Innovation:</strong> Process improvements, new ideas, efficiency gains</li>
          <li><strong>Time Management:</strong> Deadlines, prioritization, multitasking</li>
          <li><strong>Failure/Learning:</strong> Mistakes, setbacks, growth mindset</li>
          <li><strong>Collaboration:</strong> Teamwork, cross-functional, communication</li>
        </ul>

        <h3>Evaluation Criteria</h3>
        <p>For behavioral questions, evaluation focuses on:</p>
        <ul>
          <li><strong>Structure:</strong> Follows STAR method</li>
          <li><strong>Specificity:</strong> Concrete details, not vague generalities</li>
          <li><strong>Ownership:</strong> "I" not "we", personal actions</li>
          <li><strong>Impact:</strong> Quantifiable results when possible</li>
          <li><strong>Learning:</strong> Shows growth and self-awareness</li>
        </ul>

        <h3>Common Pitfalls</h3>
        <ul>
          <li>Being too vague or generic</li>
          <li>Using "we" instead of "I"</li>
          <li>Spending too long on situation/task, not enough on action</li>
          <li>No measurable result</li>
          <li>Not showing learning or growth</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 5,
          language: 'typescript',
          title: 'Behavioral Question Examples',
          code: `// Behavioral questions with STAR evaluation criteria
export const BEHAVIORAL_QUESTION_BANK: InterviewQuestion[] = [
  {
    id: 'beh-leadership-001',
    type: 'behavioral',
    domain: 'general',
    subDomain: 'leadership',
    difficulty: 5,
    question: 'Tell me about a time when you had to lead a team through a challenging project. How did you ensure success?',
    expectedKeyPoints: [
      'Situation: Project context and challenge',
      'Task: Your leadership role',
      'Action: Specific steps taken',
      'Result: Outcome and learning'
    ],
    evaluationCriteria: {
      technicalAccuracy: {
        weight: 0.2,
        keyPoints: ['Technical challenges mentioned', 'Technical decisions made']
      },
      communication: {
        weight: 0.3,
        aspects: ['clarity', 'structure', 'conciseness']
      },
      completeness: {
        weight: 0.3,
        requiredElements: ['Situation', 'Task', 'Action', 'Result']
      },
      depth: {
        weight: 0.2,
        expectedDetails: ['Leadership style', 'Team dynamics', 'Specific actions']
      }
    },
    followUps: [
      {
        question: 'What would you do differently if you faced a similar situation again?',
        trigger: 'always',
        depth: 'intermediate'
      }
    ],
    tags: ['behavioral', 'leadership', 'teamwork', 'STAR'],
    company: 'Amazon',
    metadata: {
      createdAt: new Date('2024-01-01'),
      source: 'curated',
      effectiveness: 0.89,
      avgResponseTime: 300,
      avgScore: 70,
      timesAsked: 85,
      lastUpdated: new Date('2024-01-01')
    }
  },

  {
    id: 'beh-conflict-001',
    type: 'behavioral',
    domain: 'general',
    subDomain: 'conflict-resolution',
    difficulty: 6,
    question: 'Describe a situation where you had a disagreement with a colleague about a technical approach. How did you resolve it?',
    expectedKeyPoints: [
      'Situation: Nature of disagreement',
      'Task: Need for resolution',
      'Action: How conflict was addressed',
      'Result: Resolution and relationship'
    ],
    evaluationCriteria: {
      technicalAccuracy: {
        weight: 0.2,
        keyPoints: ['Technical arguments presented', 'Trade-offs considered']
      },
      communication: {
        weight: 0.3,
        aspects: ['clarity', 'structure', 'conciseness']
      },
      completeness: {
        weight: 0.3,
        requiredElements: ['Situation', 'Task', 'Action', 'Result']
      },
      depth: {
        weight: 0.2,
        expectedDetails: ['Communication approach', 'Compromise', 'Relationship outcome']
      }
    },
    followUps: [
      {
        question: 'How do you typically handle technical disagreements?',
        trigger: 'always',
        depth: 'intermediate'
      }
    ],
    tags: ['behavioral', 'conflict-resolution', 'communication', 'STAR'],
    company: 'Google',
    metadata: {
      createdAt: new Date('2024-01-01'),
      source: 'curated',
      effectiveness: 0.87,
      avgResponseTime: 280,
      avgScore: 68,
      timesAsked: 75,
      lastUpdated: new Date('2024-01-01')
    }
  },

  {
    id: 'beh-failure-001',
    type: 'behavioral',
    domain: 'general',
    subDomain: 'learning',
    difficulty: 6,
    question: 'Tell me about a time when you failed or made a significant mistake. What did you learn?',
    expectedKeyPoints: [
      'Situation: What went wrong',
      'Task: Your role and responsibility',
      'Action: How you addressed it',
      'Result: Learning and growth'
    ],
    evaluationCriteria: {
      technicalAccuracy: {
        weight: 0.2,
        keyPoints: ['Technical mistake details', 'Corrective actions']
      },
      communication: {
        weight: 0.3,
        aspects: ['clarity', 'structure', 'conciseness']
      },
      completeness: {
        weight: 0.3,
        requiredElements: ['Situation', 'Task', 'Action', 'Result', 'Learning']
      },
      depth: {
        weight: 0.2,
        expectedDetails: ['Self-awareness', 'Accountability', 'Growth mindset']
      }
    },
    followUps: [
      {
        question: 'How has this experience changed your approach?',
        trigger: 'always',
        depth: 'deep'
      }
    ],
    tags: ['behavioral', 'failure', 'learning', 'growth-mindset', 'STAR'],
    company: 'Amazon',
    metadata: {
      createdAt: new Date('2024-01-01'),
      source: 'curated',
      effectiveness: 0.92,
      avgResponseTime: 310,
      avgScore: 67,
      timesAsked: 90,
      lastUpdated: new Date('2024-01-01')
    }
  }
];

// STAR Method Guidance
export const STAR_METHOD_GUIDE = {
  situation: {
    name: 'Situation',
    description: 'Set the scene and give context',
    tips: [
      'Be specific about when and where',
      'Include relevant details only',
      'Keep it concise (20-30 seconds)',
      'Make it relatable to the role'
    ],
    example: 'In my previous role at Company X, we were migrating our legacy Angular app to the latest version. The codebase had accumulated 5 years of technical debt...'
  },
  task: {
    name: 'Task',
    description: 'Describe your responsibility or challenge',
    tips: [
      'Clarify your specific role',
      'Explain what needed to be done',
      'Highlight the challenge or goal',
      'Connect to your skills'
    ],
    example: 'I was tasked with leading the migration effort while ensuring zero downtime and maintaining all existing features...'
  },
  action: {
    name: 'Action',
    description: 'Explain the steps you took',
    tips: [
      'Focus on YOUR actions (use "I", not "we")',
      'Be specific about what you did',
      'Explain your thought process',
      'Show problem-solving skills',
      'This is the longest part (60-70% of answer)'
    ],
    example: 'I started by creating a detailed migration plan. First, I audited the codebase to identify deprecated APIs. Then I broke the migration into phases...'
  },
  result: {
    name: 'Result',
    description: 'Share the outcome and what you learned',
    tips: [
      'Quantify results when possible',
      'Highlight positive outcomes',
      'Mention recognition received',
      'Include lessons learned',
      'Connect to business impact'
    ],
    example: 'We completed the migration 2 weeks ahead of schedule with zero production incidents. This reduced our bundle size by 30% and improved load time by 40%...'
  }
};`,
          copyable: true,
        },
      ],
      interviewTips: [
        'STAR method: Situation (context, 15-20%), Task (role, 10-15%), Action (steps taken, 50-60%), Result (outcome, 15-20%)',
        'Action is the most important: Focus on YOUR specific actions (use "I" not "we"), explain thought process, show problem-solving',
        'Results should be quantifiable: Numbers, percentages, metrics; show business impact and learning',
        'Preparation: Have 8-10 core stories covering different competencies (leadership, conflict, failure, teamwork, innovation)',
        'Common mistakes: Too vague, using "we" instead of "I", too much time on situation/task, no measurable result, no learning shown',
      ],
    },
    {
      id: 314,
      title: 'Voice Interaction Integration',
      content: `
        <h2>Web Speech API for Interview Practice</h2>
        <p>Voice interaction adds realism to interview practice, mimicking real interview scenarios where candidates speak their answers. The Web Speech API provides both Speech-to-Text (answer recording) and Text-to-Speech (question reading).</p>

        <h3>Web Speech API Features</h3>
        <ul>
          <li><strong>Speech Recognition:</strong> Convert spoken words to text in real-time</li>
          <li><strong>Speech Synthesis:</strong> Read questions aloud with natural voice</li>
          <li><strong>Language Support:</strong> Multiple languages and accents</li>
          <li><strong>Continuous Recognition:</strong> Stream transcription as user speaks</li>
          <li><strong>Voice Selection:</strong> Choose from available system voices</li>
        </ul>

        <h3>Voice Analysis Metrics</h3>
        <table>
          <tr>
            <th>Metric</th>
            <th>What It Measures</th>
            <th>Good Range</th>
          </tr>
          <tr>
            <td>Speaking Pace</td>
            <td>Words per minute</td>
            <td>120-160 WPM</td>
          </tr>
          <tr>
            <td>Filler Words</td>
            <td>Um, uh, like, you know</td>
            <td>< 5% of words</td>
          </tr>
          <tr>
            <td>Pause Duration</td>
            <td>Average silence length</td>
            <td>< 2 seconds</td>
          </tr>
          <tr>
            <td>Confidence</td>
            <td>Recognition confidence</td>
            <td>> 0.8</td>
          </tr>
          <tr>
            <td>Clarity</td>
            <td>Speech quality</td>
            <td>> 0.7</td>
          </tr>
        </table>

        <h3>Browser Support</h3>
        <p>Web Speech API support varies by browser:</p>
        <ul>
          <li><strong>Chrome/Edge:</strong> Full support for recognition and synthesis</li>
          <li><strong>Safari:</strong> Limited recognition, full synthesis</li>
          <li><strong>Firefox:</strong> Synthesis only, no recognition</li>
          <li><strong>Fallback:</strong> Provide text input when voice unavailable</li>
        </ul>

        <h3>Privacy Considerations</h3>
        <ul>
          <li>Request microphone permission explicitly</li>
          <li>Show clear recording indicator</li>
          <li>Provide manual stop control</li>
          <li>Store recordings locally (optional)</li>
          <li>Allow users to disable voice features</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 6,
          language: 'typescript',
          title: 'Voice Interview Service',
          code: `// src/app/services/voice-interview.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface VoiceAnalysis {
  transcription: string;
  fillerWords: { word: string; count: number }[];
  speakingPace: number; // words per minute
  pauseDuration: number; // average seconds
  confidence: number; // 0-1
  clarity: number; // 0-1
  overallQuality: number; // 0-1
}

@Injectable({
  providedIn: 'root'
})
export class VoiceInterviewService {
  private recognition: any; // SpeechRecognition
  private synthesis: SpeechSynthesis;
  private isRecording$ = new BehaviorSubject<boolean>(false);
  private transcription$ = new Subject<string>();
  private voiceAnalysis$ = new Subject<VoiceAnalysis>();

  private currentTranscript = '';
  private recordingStartTime: number = 0;
  private fillerWordCounts = new Map<string, number>();
  private wordTimestamps: number[] = [];

  constructor() {
    this.initializeSpeechRecognition();
    this.synthesis = window.speechSynthesis;
  }

  private initializeSpeechRecognition(): void {
    const SpeechRecognition = (window as any).SpeechRecognition ||
                             (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Speech Recognition not supported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      this.handleRecognitionResult(event);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording$.next(false);
    };

    this.recognition.onend = () => {
      if (this.isRecording$.value) {
        this.recognition.start(); // Restart if still recording
      }
    };
  }

  async startVoiceRecording(): Promise<void> {
    if (!this.recognition) {
      throw new Error('Speech recognition not available');
    }

    this.currentTranscript = '';
    this.recordingStartTime = Date.now();
    this.fillerWordCounts.clear();
    this.wordTimestamps = [];

    this.recognition.start();
    this.isRecording$.next(true);
  }

  async stopVoiceRecording(): Promise<VoiceAnalysis> {
    if (!this.recognition) {
      throw new Error('Speech recognition not available');
    }

    this.recognition.stop();
    this.isRecording$.next(false);

    const duration = (Date.now() - this.recordingStartTime) / 1000;
    const analysis = this.analyzeVoiceResponse(this.currentTranscript, duration);

    this.voiceAnalysis$.next(analysis);
    return analysis;
  }

  async speakQuestion(
    question: string,
    options?: { rate?: number; pitch?: number; volume?: number }
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 1.0;
      utterance.volume = options?.volume || 1.0;

      const voices = this.synthesis.getVoices();
      const preferredVoice = voices.find(v =>
        v.lang.startsWith('en') && v.name.includes('Female')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);

      this.synthesis.speak(utterance);
    });
  }

  getRecordingStatus() {
    return this.isRecording$.asObservable();
  }

  getTranscription() {
    return this.transcription$.asObservable();
  }

  getVoiceAnalysis() {
    return this.voiceAnalysis$.asObservable();
  }

  private handleRecognitionResult(event: any): void {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
        this.wordTimestamps.push(Date.now());
        this.detectFillerWords(transcript);
      } else {
        interimTranscript += transcript;
      }
    }

    if (finalTranscript) {
      this.currentTranscript += finalTranscript;
    }

    this.transcription$.next(this.currentTranscript + interimTranscript);
  }

  private detectFillerWords(transcript: string): void {
    const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'basically', 'actually'];
    const lowerTranscript = transcript.toLowerCase();

    fillerWords.forEach(filler => {
      const regex = new RegExp(\`\\\\b\${filler}\\\\b\`, 'gi');
      const matches = lowerTranscript.match(regex);

      if (matches) {
        const currentCount = this.fillerWordCounts.get(filler) || 0;
        this.fillerWordCounts.set(filler, currentCount + matches.length);
      }
    });
  }

  private analyzeVoiceResponse(transcription: string, duration: number): VoiceAnalysis {
    const words = transcription.trim().split(/\\s+/);
    const wordCount = words.length;
    const speakingPace = duration > 0 ? (wordCount / duration) * 60 : 0;

    const pauseDurations = this.calculatePauseDurations();
    const fillerWords = Array.from(this.fillerWordCounts.entries())
      .map(([word, count]) => ({ word, count, timestamps: [] }));

    const totalFillerWords = fillerWords.reduce((sum, f) => sum + f.count, 0);
    const fillerWordRatio = wordCount > 0 ? totalFillerWords / wordCount : 0;

    const avgPauseDuration = pauseDurations.length > 0
      ? pauseDurations.reduce((a, b) => a + b, 0) / pauseDurations.length
      : 0;

    const confidence = this.calculateConfidence({
      speakingPace,
      fillerWordRatio,
      avgPauseDuration
    });

    const clarity = this.calculateClarity(transcription, wordCount);

    return {
      transcription,
      fillerWords,
      speakingPace,
      pauseDuration: avgPauseDuration,
      volumeVariation: 0.5,
      confidence,
      clarity,
      overallQuality: (confidence + clarity) / 2
    };
  }

  private calculatePauseDurations(): number[] {
    const pauses: number[] = [];
    for (let i = 1; i < this.wordTimestamps.length; i++) {
      const pause = (this.wordTimestamps[i] - this.wordTimestamps[i - 1]) / 1000;
      if (pause > 0.5) {
        pauses.push(pause);
      }
    }
    return pauses;
  }

  private calculateConfidence(metrics: {
    speakingPace: number;
    fillerWordRatio: number;
    avgPauseDuration: number;
  }): number {
    let score = 1.0;

    if (metrics.speakingPace < 100 || metrics.speakingPace > 180) {
      score -= 0.2;
    }

    score -= Math.min(metrics.fillerWordRatio * 2, 0.3);

    if (metrics.avgPauseDuration > 2) {
      score -= 0.2;
    }

    return Math.max(0, Math.min(1, score));
  }

  private calculateClarity(transcription: string, wordCount: number): number {
    let score = 1.0;

    if (wordCount < 30) {
      score -= 0.3;
    }

    const sentences = transcription.split(/[.!?]+/);
    const incompleteSentences = sentences.filter(s =>
      s.trim().length > 0 && s.trim().length < 5
    ).length;

    if (incompleteSentences > sentences.length * 0.3) {
      score -= 0.2;
    }

    return Math.max(0, Math.min(1, score));
  }

  isSupported(): boolean {
    return !!(window as any).SpeechRecognition ||
           !!(window as any).webkitSpeechRecognition;
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Web Speech API: SpeechRecognition for transcription, SpeechSynthesis for reading questions; browser support varies',
        'Voice metrics: Speaking pace (120-160 WPM ideal), filler words (< 5% of words), pause duration (< 2s average), confidence/clarity scores',
        'Implementation: Continuous recognition for streaming transcription, detect filler words with regex, track word timestamps for pacing',
        'User experience: Clear recording indicator, manual controls, visual feedback, graceful degradation (text fallback)',
        'Privacy: Explicit microphone permission, clear recording status, local storage only, user control to disable',
      ],
    },
    {
      id: 315,
      title: 'Real-Time Answer Evaluation',
      content: `
        <h2>AI-Powered Answer Evaluation</h2>
        <p>Real-time evaluation provides immediate feedback as candidates answer, helping them understand their performance and adjust their approach. AI analyzes answers across multiple dimensions (technical accuracy, communication, completeness, depth).</p>

        <h3>Evaluation Process</h3>
        <ol>
          <li><strong>Answer Submission:</strong> Text or voice transcription</li>
          <li><strong>AI Analysis:</strong> Send to AI with structured prompt</li>
          <li><strong>Key Point Detection:</strong> Identify mentioned concepts</li>
          <li><strong>Scoring:</strong> Calculate scores across evaluation criteria</li>
          <li><strong>Feedback Generation:</strong> Strengths, weaknesses, improvements</li>
          <li><strong>Follow-Up Questions:</strong> Generate based on gaps</li>
        </ol>

        <h3>Multi-Dimensional Scoring</h3>
        <table>
          <tr>
            <th>Dimension</th>
            <th>Weight</th>
            <th>What It Measures</th>
          </tr>
          <tr>
            <td>Technical Accuracy</td>
            <td>40%</td>
            <td>Correctness, key points covered, facts</td>
          </tr>
          <tr>
            <td>Communication</td>
            <td>20%</td>
            <td>Clarity, structure, conciseness</td>
          </tr>
          <tr>
            <td>Completeness</td>
            <td>20%</td>
            <td>All required elements addressed</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>20%</td>
            <td>Beyond surface-level, examples, trade-offs</td>
          </tr>
        </table>

        <h3>AI Prompt Structure</h3>
        <p>Structured prompt for consistent evaluation:</p>
        <ul>
          <li>Question and context</li>
          <li>Expected key points</li>
          <li>Candidate's answer</li>
          <li>Evaluation criteria with weights</li>
          <li>Voice analysis (if applicable)</li>
          <li>Requested output format (JSON)</li>
        </ul>

        <h3>Feedback Components</h3>
        <ul>
          <li><strong>Strengths:</strong> What the candidate did well</li>
          <li><strong>Weaknesses:</strong> Areas for improvement</li>
          <li><strong>Missed Key Points:</strong> Critical concepts not mentioned</li>
          <li><strong>Suggested Improvements:</strong> Specific actionable advice</li>
          <li><strong>Follow-Up Questions:</strong> Probe deeper or clarify</li>
          <li><strong>Comparison to Ideal:</strong> How answer compares to expected</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 7,
          language: 'typescript',
          title: 'Answer Evaluator Service',
          code: `// src/app/services/answer-evaluator.service.ts
import { Injectable } from '@angular/core';
import { AIService } from '@app/services/ai.service';

export interface AnswerEvaluation {
  score: number; // 0-100
  categoryScores: {
    technicalAccuracy: number;
    communication: number;
    completeness: number;
    depth: number;
  };
  strengths: string[];
  weaknesses: string[];
  missedKeyPoints: string[];
  suggestedImprovements: string[];
  followUpQuestions: string[];
  comparisonToIdeal: string;
  aiExplanation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnswerEvaluator {
  constructor(private aiService: AIService) {}

  async evaluateAnswer(
    question: InterviewQuestion,
    answer: string,
    responseTime: number,
    additionalContext?: {
      voiceAnalysis?: VoiceAnalysis;
      codeAnalysis?: CodeAnalysis;
    }
  ): Promise<AnswerEvaluation> {
    const prompt = this.buildEvaluationPrompt(
      question,
      answer,
      responseTime,
      additionalContext
    );

    const aiResponse = await this.aiService.generateCompletion({
      prompt,
      temperature: 0.3,
      maxTokens: 1500
    });

    const evaluation = this.parseEvaluationResponse(aiResponse, question, answer);
    evaluation.score = this.calculateOverallScore(evaluation);

    return evaluation;
  }

  private buildEvaluationPrompt(
    question: InterviewQuestion,
    answer: string,
    responseTime: number,
    additionalContext?: any
  ): string {
    const criteria = question.evaluationCriteria;

    let prompt = \`You are an expert technical interviewer evaluating a candidate's answer.

**Question:**
\${question.question}

\${question.context ? \`**Context:**\\n\${question.context}\\n\` : ''}

**Expected Key Points:**
\${question.expectedKeyPoints.map((p, i) => \`\${i + 1}. \${p}\`).join('\\n')}

**Candidate's Answer:**
\${answer}

**Response Time:** \${responseTime} seconds

**Evaluation Criteria:**
- Technical Accuracy (weight: \${criteria.technicalAccuracy.weight}): \${criteria.technicalAccuracy.keyPoints.join(', ')}
- Communication (weight: \${criteria.communication.weight}): \${criteria.communication.aspects.join(', ')}
- Completeness (weight: \${criteria.completeness.weight}): \${criteria.completeness.requiredElements.join(', ')}
- Depth (weight: \${criteria.depth.weight}): \${criteria.depth.expectedDetails.join(', ')}
\`;

    if (additionalContext?.voiceAnalysis) {
      const va = additionalContext.voiceAnalysis;
      prompt += \`\\n**Voice Analysis:**
- Speaking Pace: \${va.speakingPace.toFixed(1)} words/min
- Filler Words: \${va.fillerWords.reduce((s, f) => s + f.count, 0)}
- Confidence: \${(va.confidence * 100).toFixed(0)}%
- Clarity: \${(va.clarity * 100).toFixed(0)}%
\`;
    }

    prompt += \`\\n**Please evaluate and return a JSON object:**
{
  "categoryScores": {
    "technicalAccuracy": <0-100>,
    "communication": <0-100>,
    "completeness": <0-100>,
    "depth": <0-100>
  },
  "strengths": ["Strength 1", "Strength 2", ...],
  "weaknesses": ["Weakness 1", "Weakness 2", ...],
  "missedKeyPoints": ["Missed point 1", ...],
  "suggestedImprovements": ["Improvement 1", "Improvement 2", ...],
  "followUpQuestions": ["Follow-up 1", ...],
  "comparisonToIdeal": "Brief comparison to an ideal answer",
  "aiExplanation": "Detailed explanation of the evaluation"
}

Be constructive, specific, and fair in your evaluation.\`;

    return prompt;
  }

  private parseEvaluationResponse(
    aiResponse: string,
    question: InterviewQuestion,
    answer: string
  ): AnswerEvaluation {
    try {
      const jsonMatch = aiResponse.match(/\\{[\\s\\S]*\\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        return {
          score: 0,
          categoryScores: parsed.categoryScores || this.getDefaultCategoryScores(),
          strengths: parsed.strengths || [],
          weaknesses: parsed.weaknesses || [],
          missedKeyPoints: parsed.missedKeyPoints || [],
          suggestedImprovements: parsed.suggestedImprovements || [],
          followUpQuestions: parsed.followUpQuestions || [],
          comparisonToIdeal: parsed.comparisonToIdeal || '',
          aiExplanation: parsed.aiExplanation || ''
        };
      }
    } catch (error) {
      console.error('Failed to parse AI evaluation:', error);
    }

    return this.performBasicEvaluation(question, answer);
  }

  private calculateOverallScore(evaluation: AnswerEvaluation): number {
    const { categoryScores } = evaluation;
    const scores = [
      categoryScores.technicalAccuracy,
      categoryScores.communication,
      categoryScores.completeness,
      categoryScores.depth
    ];

    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(avg);
  }

  private performBasicEvaluation(
    question: InterviewQuestion,
    answer: string
  ): AnswerEvaluation {
    const keyPointsFound = question.expectedKeyPoints.filter(point =>
      answer.toLowerCase().includes(point.toLowerCase().split(' ')[0])
    );

    const completeness = keyPointsFound.length / question.expectedKeyPoints.length;
    const baseScore = completeness * 100;

    return {
      score: Math.round(baseScore),
      categoryScores: {
        technicalAccuracy: Math.round(baseScore),
        communication: 70,
        completeness: Math.round(completeness * 100),
        depth: 60
      },
      strengths: keyPointsFound.length > 0 ? ['Addressed some key points'] : [],
      weaknesses: keyPointsFound.length < question.expectedKeyPoints.length
        ? ['Missed some important concepts']
        : [],
      missedKeyPoints: question.expectedKeyPoints.filter(point =>
        !keyPointsFound.includes(point)
      ),
      suggestedImprovements: [
        'Provide more specific examples',
        'Elaborate on key concepts'
      ],
      followUpQuestions: question.followUps
        .filter(f => f.trigger === 'always')
        .map(f => f.question),
      comparisonToIdeal: 'Your answer covered some key points but could be more comprehensive.',
      aiExplanation: 'Basic evaluation performed (AI evaluation unavailable).'
    };
  }

  private getDefaultCategoryScores() {
    return {
      technicalAccuracy: 50,
      communication: 50,
      completeness: 50,
      depth: 50
    };
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Evaluation prompt: Include question, expected key points, candidate answer, evaluation criteria, voice analysis (if voice)',
        'Multi-dimensional scoring: Technical accuracy (40%), communication (20%), completeness (20%), depth (20%); weighted average for overall',
        'AI response parsing: Extract JSON from response, validate structure, fallback to basic evaluation if parsing fails',
        'Basic evaluation fallback: Count key points mentioned, calculate completeness ratio, provide generic feedback',
        'Constructive feedback: Always include strengths, specific weaknesses, actionable improvements, comparison to ideal answer',
      ],
    },
    {
      id: 316,
      title: 'Coding Challenges & System Design',
      content: `
        <h2>Interactive Coding Challenges</h2>
        <p>Coding challenges test algorithmic thinking and problem-solving skills. They include a problem statement, examples, constraints, and test cases. Candidates write code in Monaco editor (VS Code in browser) with real-time syntax checking and test validation.</p>

        <h3>Coding Challenge Components</h3>
        <ul>
          <li><strong>Problem Statement:</strong> Clear description with examples</li>
          <li><strong>Input/Output Examples:</strong> Sample test cases</li>
          <li><strong>Constraints:</strong> Input limits, time/space complexity expectations</li>
          <li><strong>Monaco Editor:</strong> Full-featured code editor</li>
          <li><strong>Test Runner:</strong> Execute code against test cases</li>
          <li><strong>Hint System:</strong> Progressive hints (max 3)</li>
          <li><strong>Timer:</strong> Track time spent</li>
        </ul>

        <h3>System Design Interview Mode</h3>
        <p>System design questions assess architectural thinking, scalability considerations, and trade-off analysis. They include:</p>
        <ul>
          <li><strong>Whiteboard Canvas:</strong> Draw components, connections, data flow</li>
          <li><strong>Requirements Gathering:</strong> Functional and non-functional</li>
          <li><strong>Component Diagrams:</strong> Services, databases, caches, queues</li>
          <li><strong>Scaling Discussion:</strong> Horizontal vs vertical, sharding, replication</li>
          <li><strong>Trade-Off Analysis:</strong> CAP theorem, consistency vs availability</li>
          <li><strong>AI Prompts:</strong> "How would you handle 10x traffic?"</li>
        </ul>

        <h3>Code Execution</h3>
        <table>
          <tr>
            <th>Method</th>
            <th>Security</th>
            <th>Performance</th>
          </tr>
          <tr>
            <td>Web Worker</td>
            <td>Medium (same origin)</td>
            <td>Fast</td>
          </tr>
          <tr>
            <td>Sandboxed IFrame</td>
            <td>High (isolated context)</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Server-Side API</td>
            <td>Highest (separate environment)</td>
            <td>Slower (network)</td>
          </tr>
        </table>

        <h3>Test Case Validation</h3>
        <p>Run code against predefined test cases:</p>
        <ul>
          <li>Basic cases (happy path)</li>
          <li>Edge cases (empty, null, boundaries)</li>
          <li>Performance cases (large inputs)</li>
          <li>Error cases (invalid inputs)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 8,
          language: 'typescript',
          title: 'Coding Challenge Component with Monaco Editor',
          code: `// src/app/components/coding-challenge/coding-challenge.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: { input: string; output: string }[];
  constraints: string[];
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
}

export interface TestCase {
  id: string;
  input: any;
  expected: any;
  hidden?: boolean;
}

@Component({
  selector: 'app-coding-challenge',
  template: \`
    <div class="challenge-header">
      <h2>{{ problem.title }}</h2>
      <ion-chip [color]="getDifficultyColor()">
        {{ problem.difficulty }}
      </ion-chip>
      <div class="timer">
        <ion-icon name="time-outline"></ion-icon>
        {{ elapsedTime | date:'mm:ss' }}
      </div>
    </div>

    <div class="problem-statement">
      <p>{{ problem.description }}</p>

      <div class="examples">
        <h3>Examples:</h3>
        <div *ngFor="let example of problem.examples" class="example">
          <code>Input: {{ example.input }}</code>
          <code>Output: {{ example.output }}</code>
        </div>
      </div>

      <div class="constraints">
        <h3>Constraints:</h3>
        <ul>
          <li *ngFor="let constraint of problem.constraints">
            {{ constraint }}
          </li>
        </ul>
      </div>
    </div>

    <div class="code-editor">
      <ngx-monaco-editor
        [options]="editorOptions"
        [(ngModel)]="code"
        (ngModelChange)="onCodeChange($event)"
      ></ngx-monaco-editor>
    </div>

    <div class="actions">
      <ion-button (click)="runCode()" fill="outline">
        <ion-icon name="play" slot="start"></ion-icon>
        Run Tests
      </ion-button>
      <ion-button (click)="submitSolution()" color="primary">
        <ion-icon name="checkmark" slot="start"></ion-icon>
        Submit
      </ion-button>
      <ion-button (click)="getHint()" [disabled]="hintsUsed >= maxHints" fill="clear">
        <ion-icon name="bulb-outline" slot="start"></ion-icon>
        Hint ({{ hintsUsed }}/{{ maxHints }})
      </ion-button>
    </div>

    <div class="test-results" *ngIf="testResults">
      <h3>Test Results</h3>
      <div *ngFor="let result of testResults" [class.passed]="result.passed" class="test-case">
        <ion-icon [name]="result.passed ? 'checkmark-circle' : 'close-circle'"></ion-icon>
        <span>Test {{ result.id }}: {{ result.passed ? 'Passed' : 'Failed' }}</span>
        <div *ngIf="!result.passed" class="failure-details">
          <p>Expected: {{ result.expected }}</p>
          <p>Got: {{ result.actual }}</p>
        </div>
      </div>
    </div>

    <div class="hint-display" *ngIf="currentHint">
      <ion-icon name="bulb"></ion-icon>
      <p>{{ currentHint }}</p>
    </div>
  \`,
  copyable: true
})
export class CodingChallengeComponent {
  @Input() problem!: CodingProblem;
  @Output() solutionSubmitted = new EventEmitter<any>();

  code = '';
  testResults: any[] | null = null;
  hintsUsed = 0;
  maxHints = 3;
  currentHint = '';
  elapsedTime = 0;

  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14
  };

  ngOnInit() {
    this.code = this.problem.starterCode;
    this.startTimer();
  }

  async runCode(): Promise<void> {
    try {
      const results = await this.executeCodeAgainstTests(this.code, this.problem.testCases);
      this.testResults = results;
    } catch (error: any) {
      this.testResults = [{
        id: 'error',
        passed: false,
        error: error.message
      }];
    }
  }

  async submitSolution(): Promise<void> {
    await this.runCode();

    const allPassed = this.testResults?.every(r => r.passed) || false;

    if (allPassed) {
      this.solutionSubmitted.emit({
        code: this.code,
        testResults: this.testResults,
        hintsUsed: this.hintsUsed,
        timeSpent: this.elapsedTime
      });
    } else {
      alert('Some tests failed. Please fix your code.');
    }
  }

  getHint(): void {
    if (this.hintsUsed < this.maxHints) {
      this.currentHint = this.problem.hints[this.hintsUsed];
      this.hintsUsed++;
    }
  }

  private async executeCodeAgainstTests(code: string, testCases: TestCase[]): Promise<any[]> {
    // Execute in Web Worker or sandboxed iframe
    const results = [];

    for (const testCase of testCases.filter(t => !t.hidden)) {
      try {
        const actual = await this.executeCode(code, testCase.input);
        results.push({
          id: testCase.id,
          passed: JSON.stringify(actual) === JSON.stringify(testCase.expected),
          expected: testCase.expected,
          actual
        });
      } catch (error: any) {
        results.push({
          id: testCase.id,
          passed: false,
          error: error.message
        });
      }
    }

    return results;
  }

  private async executeCode(code: string, input: any): Promise<any> {
    // Simplified execution (use Web Worker or server-side in production)
    const func = new Function('input', \`
      \${code}
      return solution(input);
    \`);

    return func(input);
  }

  private startTimer(): void {
    setInterval(() => {
      this.elapsedTime++;
    }, 1000);
  }

  getDifficultyColor(): string {
    const colors: Record<string, string> = {
      easy: 'success',
      medium: 'warning',
      hard: 'danger'
    };
    return colors[this.problem.difficulty];
  }

  onCodeChange(code: string): void {
    // Auto-save or syntax validation
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Monaco editor: Full VS Code features in browser (syntax highlighting, IntelliSense, multi-cursor); configure for TypeScript/JavaScript',
        'Code execution: Web Worker (fast, same origin), sandboxed iframe (more secure), server-side API (most secure, slower)',
        'Test validation: Run visible test cases, compare expected vs actual with deep equality, show failures with input/output/expected',
        'Hint system: Progressive hints (3 max), penalty for using hints, reveal approach gradually (not full solution)',
        'System design: Whiteboard canvas for diagrams, requirements gathering (functional/non-functional), scaling discussion prompts from AI',
      ],
    },
    {
      id: 317,
      title: 'Interview Scoring & Feedback',
      content: `
        <h2>Multi-Dimensional Interview Scoring</h2>
        <p>Comprehensive scoring across multiple categories provides a holistic view of candidate performance. Scores are weighted, aggregated, and used to generate detailed feedback and improvement plans.</p>

        <h3>Score Categories</h3>
        <table>
          <tr>
            <th>Category</th>
            <th>What It Measures</th>
          </tr>
          <tr>
            <td>Technical Knowledge</td>
            <td>Correctness, depth of understanding, concept mastery</td>
          </tr>
          <tr>
            <td>Problem Solving</td>
            <td>Approach, algorithm selection, optimization, debugging</td>
          </tr>
          <tr>
            <td>Communication</td>
            <td>Clarity, structure, listening, explaining technical concepts</td>
          </tr>
          <tr>
            <td>Code Quality</td>
            <td>Readability, best practices, error handling, edge cases</td>
          </tr>
          <tr>
            <td>Systems Thinking</td>
            <td>Architecture, scalability, trade-offs, constraints</td>
          </tr>
          <tr>
            <td>Behavioral</td>
            <td>STAR method, experiences, soft skills, culture fit</td>
          </tr>
        </table>

        <h3>Readiness Levels</h3>
        <ul>
          <li><strong>Needs Practice (< 60):</strong> Focus on fundamentals, 10+ more sessions recommended</li>
          <li><strong>Nearly Ready (60-74):</strong> Good foundation, polish weak areas, 3-5 more sessions</li>
          <li><strong>Interview Ready (75-89):</strong> Solid performance, ready to interview with preparation</li>
          <li><strong>Strong Candidate (90+):</strong> Excellent performance, competitive for top companies</li>
        </ul>

        <h3>Feedback Generation</h3>
        <p>Detailed feedback includes:</p>
        <ul>
          <li><strong>Overall Summary:</strong> High-level performance assessment</li>
          <li><strong>Strengths:</strong> What the candidate did well (specific examples)</li>
          <li><strong>Weaknesses:</strong> Areas needing improvement (with context)</li>
          <li><strong>Improvement Plan:</strong> Specific action items with resources</li>
          <li><strong>Next Steps:</strong> Recommended practice focus</li>
          <li><strong>Estimated Timeline:</strong> Time to readiness</li>
        </ul>

        <h3>Score Calculation</h3>
        <p>Overall score is weighted average of:</p>
        <ul>
          <li>Question-level scores (per response)</li>
          <li>Category averages across all questions</li>
          <li>Penalties for hints used, time exceeded</li>
          <li>Bonuses for exceptional answers, follow-up insights</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 9,
          language: 'typescript',
          title: 'Interview Scorer Service',
          code: `// src/app/services/interview-scorer.service.ts
import { Injectable } from '@angular/core';

export interface InterviewScore {
  overall: number; // 0-100
  categories: {
    technicalKnowledge: number;
    problemSolving: number;
    communication: number;
    codeQuality: number;
    systemsThinking: number;
    behavioral: number;
  };
  strengths: string[];
  weaknesses: string[];
  detailedFeedback: FeedbackItem[];
  improvementPlan: ImprovementSuggestion[];
  readinessLevel: 'needs-practice' | 'nearly-ready' | 'interview-ready' | 'strong-candidate';
}

export interface FeedbackItem {
  questionId: string;
  question: string;
  score: number;
  feedback: string;
  keyPointsCovered: string[];
  missedPoints: string[];
}

export interface ImprovementSuggestion {
  area: string;
  currentLevel: number;
  targetLevel: number;
  resources: string[];
  practiceExercises: string[];
  estimatedTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewScorer {
  async scoreInterviewSession(session: InterviewSession): Promise<InterviewScore> {
    const categoryScores = this.calculateCategoryScores(session);
    const overall = this.calculateOverallScore(categoryScores);
    const readinessLevel = this.determineReadinessLevel(overall);

    const strengths = this.identifyStrengths(session, categoryScores);
    const weaknesses = this.identifyWeaknesses(session, categoryScores);
    const detailedFeedback = this.generateDetailedFeedback(session);
    const improvementPlan = this.createImprovementPlan(session, categoryScores);

    return {
      overall,
      categories: categoryScores,
      strengths,
      weaknesses,
      detailedFeedback,
      improvementPlan,
      readinessLevel
    };
  }

  private calculateCategoryScores(session: InterviewSession): any {
    const scores = {
      technicalKnowledge: 0,
      problemSolving: 0,
      communication: 0,
      codeQuality: 0,
      systemsThinking: 0,
      behavioral: 0
    };

    const counts = { ...scores };

    session.responses.forEach(response => {
      const evaluation = response.evaluation;

      if (session.type === 'technical-concept') {
        scores.technicalKnowledge += evaluation.categoryScores.technicalAccuracy;
        counts.technicalKnowledge++;

        scores.communication += evaluation.categoryScores.communication;
        counts.communication++;
      } else if (session.type === 'coding-challenge') {
        scores.problemSolving += evaluation.score;
        counts.problemSolving++;

        if (response.codeAnalysis) {
          scores.codeQuality += response.codeAnalysis.codeQuality.readability;
          counts.codeQuality++;
        }
      } else if (session.type === 'system-design') {
        scores.systemsThinking += evaluation.score;
        counts.systemsThinking++;

        scores.communication += evaluation.categoryScores.communication;
        counts.communication++;
      } else if (session.type === 'behavioral') {
        scores.behavioral += evaluation.score;
        counts.behavioral++;

        scores.communication += evaluation.categoryScores.communication;
        counts.communication++;
      }
    });

    Object.keys(scores).forEach(key => {
      if (counts[key as keyof typeof counts] > 0) {
        scores[key as keyof typeof scores] = Math.round(
          scores[key as keyof typeof scores] / counts[key as keyof typeof counts]
        );
      }
    });

    return scores;
  }

  private calculateOverallScore(categoryScores: any): number {
    const validScores = Object.values(categoryScores).filter((score: any) => score > 0);

    if (validScores.length === 0) return 0;

    const sum = validScores.reduce((acc: any, score: any) => acc + score, 0);
    return Math.round(sum / validScores.length);
  }

  private determineReadinessLevel(score: number): any {
    if (score >= 90) return 'strong-candidate';
    if (score >= 75) return 'interview-ready';
    if (score >= 60) return 'nearly-ready';
    return 'needs-practice';
  }

  private identifyStrengths(session: InterviewSession, categoryScores: any): string[] {
    const strengths: string[] = [];

    Object.entries(categoryScores).forEach(([category, score]: [string, any]) => {
      if (score >= 75) {
        const categoryName = category.replace(/([A-Z])/g, ' $1').toLowerCase();
        strengths.push(\`Strong \${categoryName}\`);
      }
    });

    return strengths;
  }

  private identifyWeaknesses(session: InterviewSession, categoryScores: any): string[] {
    const weaknesses: string[] = [];

    Object.entries(categoryScores).forEach(([category, score]: [string, any]) => {
      if (score > 0 && score < 60) {
        const categoryName = category.replace(/([A-Z])/g, ' $1').toLowerCase();
        weaknesses.push(\`Need improvement in \${categoryName}\`);
      }
    });

    return weaknesses;
  }

  private generateDetailedFeedback(session: InterviewSession): FeedbackItem[] {
    return session.responses.map(response => {
      const question = session.questions.find(q => q.id === response.questionId);

      return {
        questionId: response.questionId,
        question: question?.question || '',
        score: response.evaluation.score,
        feedback: response.evaluation.aiExplanation,
        keyPointsCovered: question?.expectedKeyPoints.filter(kp =>
          !response.evaluation.missedKeyPoints.includes(kp)
        ) || [],
        missedPoints: response.evaluation.missedKeyPoints
      };
    });
  }

  private createImprovementPlan(
    session: InterviewSession,
    categoryScores: any
  ): ImprovementSuggestion[] {
    const suggestions: ImprovementSuggestion[] = [];

    const sortedCategories = Object.entries(categoryScores)
      .filter(([, score]: [string, any]) => score > 0)
      .sort(([, a]: [string, any], [, b]: [string, any]) => a - b);

    sortedCategories.slice(0, 3).forEach(([category, score]: [string, any]) => {
      suggestions.push({
        area: category,
        currentLevel: score,
        targetLevel: Math.min(score + 20, 100),
        resources: this.getResourcesForCategory(category),
        practiceExercises: this.getPracticeExercises(category),
        estimatedTime: '2-4 weeks of focused practice'
      });
    });

    return suggestions;
  }

  private getResourcesForCategory(category: string): string[] {
    const resourceMap: Record<string, string[]> = {
      technicalKnowledge: ['MDN Web Docs', 'You Don\\'t Know JS', 'TypeScript Handbook'],
      problemSolving: ['LeetCode', 'Cracking the Coding Interview', 'AlgoExpert'],
      communication: ['Practice explaining code', 'Record yourself', 'Toastmasters'],
      codeQuality: ['Clean Code by Robert Martin', 'Refactoring', 'SonarQube'],
      systemsThinking: ['Designing Data-Intensive Applications', 'System Design Interview'],
      behavioral: ['STAR method practice', 'Prepare 10 core stories', 'Mock interviews']
    };

    return resourceMap[category] || [];
  }

  private getPracticeExercises(category: string): string[] {
    const exerciseMap: Record<string, string[]> = {
      technicalKnowledge: ['Explain closures', 'Describe event loop', 'Compare promises vs observables'],
      problemSolving: ['5 array problems', 'Tree traversal', 'Dynamic programming basics'],
      communication: ['Record 3-minute explanation', 'Whiteboard solution', 'Explain trade-offs'],
      codeQuality: ['Refactor old code', 'Write unit tests', 'Code review practice'],
      systemsThinking: ['Design URL shortener', 'Design notification system', 'Design rate limiter'],
      behavioral: ['Write 5 STAR stories', 'Conflict resolution story', 'Leadership example']
    };

    return exerciseMap[category] || [];
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Category scoring: Average scores within each category across all questions; technical (knowledge), problem-solving (algorithms), communication (clarity)',
        'Overall score: Average of all non-zero category scores; determines readiness level (< 60 needs practice, 60-74 nearly ready, 75-89 ready, 90+ strong)',
        'Strengths/weaknesses: Categories >= 75 are strengths, < 60 are weaknesses; provide specific examples from responses',
        'Improvement plan: Focus on 3 weakest areas, provide resources (books, courses), practice exercises, estimated time to improve',
        'Feedback structure: Overall summary, detailed per-question feedback, actionable next steps, timeline to readiness',
      ],
    },
    {
      id: 318,
      title: 'Performance Analytics & Progress Tracking',
      content: `
        <h2>Interview Performance Analytics</h2>
        <p>Track progress over time with detailed analytics, score trends, domain strengths, and improvement velocity. Analytics help identify patterns, measure growth, and provide data-driven recommendations.</p>

        <h3>Key Metrics</h3>
        <table>
          <tr>
            <th>Metric</th>
            <th>What It Shows</th>
          </tr>
          <tr>
            <td>Total Sessions</td>
            <td>Practice volume</td>
          </tr>
          <tr>
            <td>Average Score</td>
            <td>Current performance level</td>
          </tr>
          <tr>
            <td>Score Progression</td>
            <td>Improvement over time (trend line)</td>
          </tr>
          <tr>
            <td>Domain Strengths</td>
            <td>Performance by technology (JS, Angular, RxJS, etc.)</td>
          </tr>
          <tr>
            <td>Question Type Performance</td>
            <td>Technical vs behavioral vs coding</td>
          </tr>
          <tr>
            <td>Average Response Time</td>
            <td>Speed and efficiency</td>
          </tr>
          <tr>
            <td>Improvement Rate</td>
            <td>Points gained per session</td>
          </tr>
          <tr>
            <td>Mock Interview Success Rate</td>
            <td>Full simulation performance</td>
          </tr>
        </table>

        <h3>Visualizations</h3>
        <ul>
          <li><strong>Score Trend Chart:</strong> Line graph showing scores over time</li>
          <li><strong>Domain Heatmap:</strong> Color-coded grid of domain performance</li>
          <li><strong>Category Radar Chart:</strong> 6-axis radar of category scores</li>
          <li><strong>Progress Gauge:</strong> Current readiness level indicator</li>
          <li><strong>Session History:</strong> List of past sessions with scores</li>
        </ul>

        <h3>Recommendations Engine</h3>
        <p>Data-driven recommendations based on analytics:</p>
        <ul>
          <li>Focus areas (weakest domains)</li>
          <li>Practice frequency (sessions per week)</li>
          <li>Question type mix (technical, behavioral, coding)</li>
          <li>Difficulty adjustment (increase when consistent 80+)</li>
          <li>Mock interview readiness (when overall >= 75)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 10,
          language: 'typescript',
          title: 'Interview Analytics Service',
          code: `// src/app/services/interview-analytics.service.ts
import { Injectable } from '@angular/core';

export interface PerformanceReport {
  totalSessions: number;
  averageScore: number;
  scoreProgression: { date: Date; score: number }[];
  domainStrengths: Map<string, number>;
  questionTypePerformance: Map<string, number>;
  averageResponseTime: number;
  improvementRate: number; // points per session
  readinessAssessment: string;
  recommendations: string[];
}

@Injectable({
  providedIn: 'root'
})
export class InterviewAnalytics {
  constructor(private storage: StorageService) {}

  async getPerformanceReport(
    userId: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<PerformanceReport> {
    const sessions = await this.storage.getSessions(userId, timeRange);

    const totalSessions = sessions.length;
    const averageScore = this.calculateAverageScore(sessions);
    const scoreProgression = this.calculateScoreProgression(sessions);
    const domainStrengths = this.calculateDomainStrengths(sessions);
    const questionTypePerformance = this.calculateQuestionTypePerformance(sessions);
    const averageResponseTime = this.calculateAverageResponseTime(sessions);
    const improvementRate = this.calculateImprovementRate(scoreProgression);
    const readinessAssessment = this.assessReadiness(averageScore, improvementRate);
    const recommendations = this.generateRecommendations(
      sessions,
      domainStrengths,
      questionTypePerformance,
      averageScore
    );

    return {
      totalSessions,
      averageScore,
      scoreProgression,
      domainStrengths,
      questionTypePerformance,
      averageResponseTime,
      improvementRate,
      readinessAssessment,
      recommendations
    };
  }

  async recordSessionComplete(
    session: InterviewSession,
    score: InterviewScore
  ): Promise<void> {
    await this.storage.saveSessionResult({
      sessionId: session.id,
      userId: session.userId,
      date: new Date(),
      type: session.type,
      domain: session.domain,
      difficulty: session.difficulty,
      overallScore: score.overall,
      categoryScores: score.categories,
      questionCount: session.questions.length,
      duration: session.duration || 0
    });
  }

  private calculateAverageScore(sessions: InterviewSession[]): number {
    if (sessions.length === 0) return 0;

    const sum = sessions.reduce((acc, s) => acc + (s.overallScore || 0), 0);
    return Math.round(sum / sessions.length);
  }

  private calculateScoreProgression(sessions: InterviewSession[]): any[] {
    return sessions
      .filter(s => s.overallScore !== undefined)
      .map(s => ({
        date: s.endTime || s.startTime,
        score: s.overallScore!
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private calculateDomainStrengths(sessions: InterviewSession[]): Map<string, number> {
    const domainScores = new Map<string, { total: number; count: number }>();

    sessions.forEach(session => {
      session.responses.forEach(response => {
        const question = session.questions.find(q => q.id === response.questionId);
        if (!question) return;

        const domain = question.subDomain || question.domain;
        const score = response.evaluation.score;

        const current = domainScores.get(domain) || { total: 0, count: 0 };
        domainScores.set(domain, {
          total: current.total + score,
          count: current.count + 1
        });
      });
    });

    const averages = new Map<string, number>();
    domainScores.forEach((value, key) => {
      averages.set(key, Math.round(value.total / value.count));
    });

    return averages;
  }

  private calculateQuestionTypePerformance(sessions: InterviewSession[]): Map<string, number> {
    const typeScores = new Map<string, { total: number; count: number }>();

    sessions.forEach(session => {
      const type = session.type;
      const score = session.overallScore || 0;

      const current = typeScores.get(type) || { total: 0, count: 0 };
      typeScores.set(type, {
        total: current.total + score,
        count: current.count + 1
      });
    });

    const averages = new Map<string, number>();
    typeScores.forEach((value, key) => {
      averages.set(key, Math.round(value.total / value.count));
    });

    return averages;
  }

  private calculateAverageResponseTime(sessions: InterviewSession[]): number {
    let totalTime = 0;
    let totalResponses = 0;

    sessions.forEach(session => {
      session.responses.forEach(response => {
        totalTime += response.responseTime;
        totalResponses++;
      });
    });

    return totalResponses > 0 ? Math.round(totalTime / totalResponses) : 0;
  }

  private calculateImprovementRate(progression: any[]): number {
    if (progression.length < 2) return 0;

    const firstScore = progression[0].score;
    const lastScore = progression[progression.length - 1].score;
    const improvement = lastScore - firstScore;

    return Math.round(improvement / progression.length * 10) / 10;
  }

  private assessReadiness(averageScore: number, improvementRate: number): string {
    if (averageScore >= 90) {
      return 'You are a strong candidate ready for top-tier interviews.';
    } else if (averageScore >= 75) {
      return 'You are interview-ready. Focus on polish and company-specific prep.';
    } else if (averageScore >= 60) {
      return 'You are nearly ready. A few more practice sessions and you\\'ll be prepared.';
    } else {
      return 'Continue practicing fundamentals. You\\'re making progress!';
    }
  }

  private generateRecommendations(
    sessions: InterviewSession[],
    domainStrengths: Map<string, number>,
    questionTypePerformance: Map<string, number>,
    averageScore: number
  ): string[] {
    const recommendations: string[] = [];

    // Focus areas (weakest domains)
    const weakDomains = Array.from(domainStrengths.entries())
      .filter(([, score]) => score < 60)
      .sort(([, a], [, b]) => a - b)
      .slice(0, 2)
      .map(([domain]) => domain);

    if (weakDomains.length > 0) {
      recommendations.push(\`Focus on: \${weakDomains.join(', ')}\`);
    }

    // Practice frequency
    if (sessions.length < 5) {
      recommendations.push('Practice at least 3 sessions per week');
    } else if (sessions.length < 10) {
      recommendations.push('Maintain 2-3 sessions per week');
    }

    // Question type mix
    const weakTypes = Array.from(questionTypePerformance.entries())
      .filter(([, score]) => score < 65)
      .map(([type]) => type);

    if (weakTypes.length > 0) {
      recommendations.push(\`Practice more \${weakTypes.join(', ')} questions\`);
    }

    // Difficulty adjustment
    if (averageScore >= 80) {
      recommendations.push('Increase difficulty level for more challenge');
    }

    // Mock interview readiness
    if (averageScore >= 75 && sessions.length >= 10) {
      recommendations.push('You\\'re ready for full mock interviews');
    }

    return recommendations;
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Analytics aggregation: Calculate averages, trends, and distributions across all sessions; group by domain, type, difficulty',
        'Score progression: Track scores over time with trend line; calculate improvement rate (points per session)',
        'Domain strengths: Aggregate scores by technology/topic; identify weakest domains for focused practice',
        'Recommendations: Data-driven suggestions based on performance patterns (weak domains, practice frequency, difficulty adjustment)',
        'Readiness assessment: Overall >= 90 (strong candidate), 75-89 (ready), 60-74 (nearly ready), < 60 (needs practice)',
      ],
    },
    {
      id: 319,
      title: 'Mock Interview Sessions & Demo',
      content: `
        <h2>Full Mock Interview Simulation</h2>
        <p>Mock interviews simulate the complete interview experience with multiple rounds, time pressure, and realistic interviewer behavior. They combine technical, behavioral, coding, and system design questions in a full 45-60 minute session.</p>

        <h3>Mock Interview Structure</h3>
        <ol>
          <li><strong>Phone Screen (10 min):</strong> Basic technical questions, background</li>
          <li><strong>Technical Round (15 min):</strong> Conceptual questions, problem-solving</li>
          <li><strong>Coding Round (20 min):</strong> Live coding challenge with test cases</li>
          <li><strong>System Design (15 min):</strong> Architecture discussion (senior+ only)</li>
          <li><strong>Behavioral Round (10 min):</strong> STAR method questions</li>
          <li><strong>Candidate Questions (5 min):</strong> Your questions for interviewer</li>
        </ol>

        <h3>Company-Specific Formats</h3>
        <ul>
          <li><strong>Google:</strong> Focus on algorithms, system design, scalability</li>
          <li><strong>Amazon:</strong> Leadership principles, behavioral depth, customer obsession</li>
          <li><strong>Facebook:</strong> Move fast, product thinking, trade-offs</li>
          <li><strong>Microsoft:</strong> Azure cloud, enterprise solutions, collaboration</li>
          <li><strong>Startup:</strong> Generalist, fast learning, scrappy solutions</li>
        </ul>

        <h3>Interviewer Personas</h3>
        <table>
          <tr>
            <th>Persona</th>
            <th>Behavior</th>
          </tr>
          <tr>
            <td>Friendly</td>
            <td>Encouraging, provides hints, collaborative</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>Professional, minimal feedback, realistic</td>
          </tr>
          <tr>
            <td>Tough</td>
            <td>Challenging, probing, stress-test</td>
          </tr>
        </table>

        <h3>Adaptive Difficulty</h3>
        <p>Questions adjust based on performance:</p>
        <ul>
          <li>Start at selected difficulty</li>
          <li>Increase difficulty if scoring 80%+</li>
          <li>Decrease difficulty if scoring < 50%</li>
          <li>Final score reflects adaptive path</li>
        </ul>

        <h3>Complete Demo Features</h3>
        <ul>
          <li>Session setup with configuration</li>
          <li>Voice interview with real-time transcription</li>
          <li>Coding challenge with Monaco editor</li>
          <li>System design whiteboard</li>
          <li>Live scoring and feedback</li>
          <li>Performance analytics dashboard</li>
          <li>Session playback and review</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 11,
          language: 'typescript',
          title: 'Mock Interview Orchestrator',
          code: `// src/app/services/mock-interview-orchestrator.service.ts
import { Injectable } from '@angular/core';

export interface MockInterviewConfig {
  company: 'FAANG' | 'startup' | 'enterprise';
  position: 'frontend' | 'backend' | 'mobile' | 'fullstack' | 'senior-mobile';
  duration: number; // minutes
  rounds: InterviewRound[];
  interviewerPersona: 'friendly' | 'neutral' | 'tough';
  realTimeHints: boolean;
  adaptiveDifficulty: boolean;
}

export interface InterviewRound {
  type: InterviewType;
  duration: number; // minutes
  questionCount: number;
  domain: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockInterviewOrchestrator {
  constructor(
    private sessionManager: InterviewSessionManager,
    private questionBank: QuestionBankService,
    private voiceService: VoiceInterviewService
  ) {}

  async startMockInterview(config: MockInterviewConfig): Promise<MockInterviewSession> {
    const session = await this.createMockSession(config);

    // Introduction
    await this.speakIntroduction(config);

    // Execute rounds sequentially
    for (const round of config.rounds) {
      await this.conductRound(session, round, config);
    }

    // Conclusion and feedback
    const finalScore = await this.concludeMockInterview(session);

    return {
      session,
      finalScore,
      completedAt: new Date()
    };
  }

  private async createMockSession(config: MockInterviewConfig): Promise<InterviewSession> {
    const allQuestions: InterviewQuestion[] = [];

    for (const round of config.rounds) {
      const questions = await this.questionBank.getQuestions({
        domains: [round.domain],
        types: [round.type],
        difficulties: [this.getInitialDifficulty(config.position)],
        limit: round.questionCount,
        companies: [config.company]
      });

      allQuestions.push(...questions);
    }

    return this.sessionManager.createSession({
      type: 'mock-full',
      domain: 'general',
      difficulty: this.mapPositionToDifficulty(config.position),
      questionCount: allQuestions.length,
      sessionConfig: {
        voiceEnabled: true,
        hintsEnabled: config.realTimeHints,
        maxHints: 2,
        interviewerPersona: config.interviewerPersona,
        realTimeFeedback: false, // Wait until end for mock
        autoAdvance: true
      }
    });
  }

  private async speakIntroduction(config: MockInterviewConfig): Promise<void> {
    const introductions: Record<string, string> = {
      friendly: "Hi! I'm excited to be interviewing you today. This will be a collaborative session, so feel free to think out loud. Let's get started!",
      neutral: "Hello. Thank you for taking the time to interview with us today. We'll be covering several topics. Let's begin.",
      tough: "Good morning. We have a lot to cover in a short time. I'll be asking challenging questions to see how you perform under pressure. Ready?"
    };

    await this.voiceService.speakQuestion(introductions[config.interviewerPersona]);
  }

  private async conductRound(
    session: InterviewSession,
    round: InterviewRound,
    config: MockInterviewConfig
  ): Promise<void> {
    const roundIntro = \`Let's move to the \${round.type} round. You'll have \${round.duration} minutes.\`;
    await this.voiceService.speakQuestion(roundIntro);

    const roundQuestions = session.questions.filter(q => q.type === round.type);

    for (const question of roundQuestions) {
      await this.askQuestion(session, question, config);

      // Adaptive difficulty adjustment
      if (config.adaptiveDifficulty) {
        const lastScore = session.responses[session.responses.length - 1]?.evaluation.score || 0;
        if (lastScore >= 80) {
          // Increase difficulty for next question
        } else if (lastScore < 50) {
          // Decrease difficulty for next question
        }
      }
    }
  }

  private async askQuestion(
    session: InterviewSession,
    question: InterviewQuestion,
    config: MockInterviewConfig
  ): Promise<void> {
    // Speak the question
    await this.voiceService.speakQuestion(question.question);

    // Wait for answer (voice or text)
    // This would be handled by UI component

    // Provide interviewer feedback based on persona
    if (config.interviewerPersona === 'friendly' && config.realTimeHints) {
      // Provide encouragement or hints
    } else if (config.interviewerPersona === 'tough') {
      // Challenge the answer with follow-ups
    }
  }

  private async concludeMockInterview(session: InterviewSession): Promise<InterviewScore> {
    const score = await this.sessionManager.completeSession();

    const conclusion = this.generateConclusionMessage(score);
    await this.voiceService.speakQuestion(conclusion);

    return score;
  }

  private generateConclusionMessage(score: InterviewScore): string {
    if (score.overall >= 90) {
      return "Excellent performance! You demonstrated strong technical skills and communication. You're well-prepared for interviews.";
    } else if (score.overall >= 75) {
      return "Good job! You showed solid understanding with some areas for improvement. You're on the right track.";
    } else if (score.overall >= 60) {
      return "Thank you for your time. There's room for growth in a few areas. I'd recommend focusing on the feedback provided.";
    } else {
      return "Thank you for interviewing. I'd suggest more practice on the fundamentals before proceeding.";
    }
  }

  private getInitialDifficulty(position: string): number {
    const difficultyMap: Record<string, number> = {
      'frontend': 5,
      'backend': 5,
      'mobile': 5,
      'fullstack': 6,
      'senior-mobile': 7
    };

    return difficultyMap[position] || 5;
  }

  private mapPositionToDifficulty(position: string): DifficultyLevel {
    if (position.startsWith('senior')) return 'senior';
    if (position.includes('fullstack')) return 'mid';
    return 'mid';
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Mock interview structure: Phone screen → Technical → Coding → System Design (senior+) → Behavioral → Q&A (45-60 min total)',
        'Company-specific: Google (algorithms, scale), Amazon (leadership principles), Facebook (product trade-offs), Startup (generalist)',
        'Interviewer personas: Friendly (encouraging, hints), Neutral (professional, realistic), Tough (challenging, stress-test)',
        'Adaptive difficulty: Start at position level, increase if 80%+, decrease if < 50%; reflects real interview adjustment',
        'Complete simulation: Voice introduction, timed rounds, sequential questions, real-time feedback (persona-dependent), final comprehensive score',
      ],
    },
  ],
};
