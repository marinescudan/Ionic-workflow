// src/app/services/chapters/data/chapter-30.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_30_DATA: Chapter = {
  id: 30,
  title: 'AI-Powered Learning Tutor',
  description: 'Build an intelligent AI tutoring system with lesson-aware context, RAG (Retrieval Augmented Generation), personalized learning paths, code review, quiz generation, Socratic teaching, and interactive chat interface for adaptive education.',
  icon: 'chatbubbles-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 300,
      title: 'AI Tutor Architecture',
      content: `
        <h2>Understanding AI Tutoring Systems</h2>
        <p>An AI tutor is an intelligent system that provides personalized learning assistance by understanding lesson content, tracking student progress, and adapting its teaching approach to individual needs. It combines language models with educational data to create an interactive learning experience.</p>

        <h3>Core Components</h3>
        <ul>
          <li><strong>Student Profile:</strong> Track progress, strengths, weaknesses, learning style</li>
          <li><strong>Lesson Context:</strong> Understand current and completed lessons</li>
          <li><strong>Conversation History:</strong> Maintain context across interactions</li>
          <li><strong>Personalization Engine:</strong> Adapt responses to student needs</li>
          <li><strong>Analytics:</strong> Measure learning effectiveness</li>
        </ul>

        <h3>Student Profiling</h3>
        <p>Track comprehensive student data for personalization:</p>
        <ul>
          <li>Completed lessons and current progress</li>
          <li>Struggling concepts and identified confusion</li>
          <li>Strengths and mastered concepts</li>
          <li>Preferred explanation style (simple, detailed, example, analogy)</li>
          <li>Learning style (visual, verbal, practical, theoretical)</li>
          <li>Questions asked and interaction history</li>
          <li>Concept mastery scores (0-100 per concept)</li>
          <li>Learning velocity (lessons per week)</li>
        </ul>

        <h3>Conversation Management</h3>
        <p>Manage multi-turn conversations with limited context:</p>
        <ul>
          <li>Sliding window: Keep recent N messages</li>
          <li>Token estimation: ~4 characters per token</li>
          <li>Context summarization: Compress old conversations</li>
          <li>Semantic pruning: Keep most relevant messages</li>
          <li>Session reset: Clear when switching lessons</li>
        </ul>

        <h3>Personalization Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Approach</th>
            <th>Benefit</th>
          </tr>
          <tr>
            <td>Learning Style</td>
            <td>Visual, verbal, practical, theoretical</td>
            <td>Match student preferences</td>
          </tr>
          <tr>
            <td>Difficulty</td>
            <td>Adapt based on performance</td>
            <td>Optimal challenge level</td>
          </tr>
          <tr>
            <td>Pacing</td>
            <td>Speed up/slow down based on mastery</td>
            <td>Efficient learning</td>
          </tr>
          <tr>
            <td>Focus</td>
            <td>Prioritize struggling concepts</td>
            <td>Address weaknesses</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'AI Tutor Interfaces - Student Profile & Configuration',
          code: `// Core AI Tutor Interface
export interface AITutor {
  studentId: string;
  currentLesson: number;
  conversationHistory: TutorMessage[];
  studentProfile: StudentProfile;
  learningStyle: LearningStyle;
}

// Student Profile Interface
export interface StudentProfile {
  studentId: string;
  completedLessons: number[];
  strugglingConcepts: string[];
  strengths: string[];
  preferredExplanationStyle: ExplanationStyle;
  questionsAsked: number;
  conceptsMastered: ConceptMastery[];
  learningVelocity: number; // Lessons per week
  lastActive: Date;
  totalStudyTime: number; // Minutes
}

// Learning Style Types
export type LearningStyle =
  | 'visual'      // Prefers diagrams, images, visual examples
  | 'verbal'      // Prefers text explanations, reading
  | 'practical'   // Prefers hands-on coding, exercises
  | 'theoretical' // Prefers conceptual understanding first
  | 'mixed';      // Combination

// Explanation Style
export type ExplanationStyle =
  | 'simple'     // ELI5 style, simple language
  | 'detailed'   // Comprehensive, thorough
  | 'example'    // Code examples first
  | 'analogy'    // Real-world analogies
  | 'socratic';  // Guiding questions

// Concept Mastery Tracking
export interface ConceptMastery {
  concept: string;
  lessonId: number;
  masteryLevel: number; // 0-100
  lastPracticed: Date;
  questionsCorrect: number;
  questionsTotal: number;
  needsReview: boolean;
}

// Tutor Message
export interface TutorMessage {
  id: string;
  role: 'student' | 'tutor';
  content: string;
  timestamp: Date;
  lessonContext?: number;
  codeSnippets?: CodeSnippet[];
  relatedConcepts?: string[];
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'AI Tutor Service - Main Orchestrator',
          code: `// src/app/services/ai-tutor/ai-tutor.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';
import { RAGService } from './rag.service';
import { TutorPromptBuilder } from './tutor-prompt-builder.service';
import { StudentProfileManager } from './student-profile-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AITutorService {
  private conversationHistory$ = new BehaviorSubject<TutorMessage[]>([]);
  private currentLesson$ = new BehaviorSubject<number>(1);

  constructor(
    private aiService: AIIntegrationService,
    private ragService: RAGService,
    private promptBuilder: TutorPromptBuilder,
    private profileManager: StudentProfileManager
  ) {}

  /**
   * Ask the tutor a question about the current lesson
   */
  async askQuestion(
    question: string,
    studentId: string
  ): Promise<TutorResponse> {
    // 1. Get student profile for personalization
    const profile = await this.profileManager.getProfile(studentId);

    // 2. Get current lesson context
    const lessonId = this.currentLesson$.value;

    // 3. Use RAG to find relevant lesson content
    const relevantChunks = await this.ragService.findRelevantContext(
      question,
      lessonId,
      5 // Top 5 relevant chunks
    );

    // 4. Build lesson-aware prompt with context
    const messages = this.promptBuilder.buildTutoringPrompt(
      question,
      {
        lessonId,
        relevantChunks,
        profile
      },
      this.conversationHistory$.value
    );

    // 5. Call AI service
    const response = await this.aiService.chat({
      messages,
      temperature: 0.7,
      maxTokens: 1000
    });

    // 6. Update conversation history
    this.addToHistory({
      id: crypto.randomUUID(),
      role: 'student',
      content: question,
      timestamp: new Date(),
      lessonContext: lessonId
    });

    this.addToHistory({
      id: crypto.randomUUID(),
      role: 'tutor',
      content: response.content,
      timestamp: new Date(),
      lessonContext: lessonId
    });

    // 7. Update profile with interaction
    await this.profileManager.recordInteraction(studentId, {
      question,
      answer: response.content,
      lessonId,
      timestamp: new Date()
    });

    return {
      content: response.content,
      relatedConcepts: this.extractConcepts(response.content),
      suggestedActions: this.suggestNextSteps(question, response.content)
    };
  }

  getConversationHistory(): Observable<TutorMessage[]> {
    return this.conversationHistory$.asObservable();
  }

  clearHistory(): void {
    this.conversationHistory$.next([]);
  }

  setCurrentLesson(lessonId: number): void {
    this.currentLesson$.next(lessonId);
  }

  private addToHistory(message: TutorMessage): void {
    const history = this.conversationHistory$.value;
    this.conversationHistory$.next([...history, message]);
  }

  private extractConcepts(content: string): string[] {
    // Extract technical terms from response
    const concepts: string[] = [];
    const technicalTerms = [
      'Observable', 'Promise', 'async/await', 'RxJS',
      'component', 'service', 'dependency injection'
    ];

    technicalTerms.forEach(term => {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        concepts.push(term);
      }
    });

    return concepts;
  }

  private suggestNextSteps(question: string, answer: string): SuggestedAction[] {
    const actions: SuggestedAction[] = [];

    if (answer.includes('\`\`\`')) {
      actions.push({
        type: 'try_code',
        label: 'Try this code',
        description: 'Copy and test the code example'
      });
    }

    actions.push({
      type: 'quiz',
      label: 'Quiz me',
      description: 'Test your understanding'
    });

    return actions;
  }
}

export interface TutorResponse {
  content: string;
  relatedConcepts?: string[];
  suggestedActions?: SuggestedAction[];
}

export interface SuggestedAction {
  type: 'quiz' | 'try_code' | 'view_lesson' | 'practice';
  label: string;
  description: string;
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'AI tutor architecture: Student profile + lesson context + conversation history + personalization engine',
        'Student profiling: Track progress, strengths, weaknesses, learning style, concept mastery for adaptation',
        'Conversation management: Sliding window (keep recent), token estimation (4 chars/token), summarization',
        'Personalization: Adapt difficulty, pacing, explanation style based on profile and performance',
        'Context limits: GPT-3.5 (4K tokens), GPT-4 (8K/32K/128K), balance cost vs context richness'
      ]
    },
    {
      id: 301,
      title: 'Retrieval Augmented Generation (RAG)',
      content: `
        <h2>Understanding RAG</h2>
        <p>Retrieval Augmented Generation (RAG) is a technique that enhances AI responses by retrieving relevant information from a knowledge base and injecting it into the prompt. Instead of relying solely on the AI's training data, RAG allows the system to reference specific, up-to-date information.</p>

        <h3>RAG Flow</h3>
        <ol>
          <li><strong>Chunk:</strong> Break lesson content into semantic chunks (600-1000 characters)</li>
          <li><strong>Embed:</strong> Convert chunks to vector embeddings using OpenAI API</li>
          <li><strong>Store:</strong> Save embeddings in vector database or local storage</li>
          <li><strong>Query:</strong> Convert student question to embedding</li>
          <li><strong>Search:</strong> Find most similar chunks (cosine similarity)</li>
          <li><strong>Inject:</strong> Add relevant chunks to AI prompt</li>
          <li><strong>Generate:</strong> AI responds with grounded context</li>
        </ol>

        <h3>Why RAG for Education?</h3>
        <ul>
          <li><strong>Accuracy:</strong> Responses based on actual lesson content</li>
          <li><strong>No Hallucination:</strong> Can't make up incorrect information</li>
          <li><strong>Up-to-date:</strong> Use latest lesson content</li>
          <li><strong>Traceable:</strong> Know which lesson sections were referenced</li>
          <li><strong>Customizable:</strong> Different content for different courses</li>
        </ul>

        <h3>Chunking Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Approach</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Fixed Size</td>
            <td>Split by character count (800 chars)</td>
            <td>Simple, consistent chunks</td>
          </tr>
          <tr>
            <td>Semantic</td>
            <td>Split by paragraphs/sections</td>
            <td>Preserve meaning</td>
          </tr>
          <tr>
            <td>Overlapping</td>
            <td>20-30% overlap between chunks</td>
            <td>Maintain context continuity</td>
          </tr>
          <tr>
            <td>Hierarchical</td>
            <td>Summary + detailed chunks</td>
            <td>Multi-level context</td>
          </tr>
        </table>

        <h3>Embedding Models</h3>
        <table>
          <tr>
            <th>Model</th>
            <th>Dimensions</th>
            <th>Cost</th>
          </tr>
          <tr>
            <td>text-embedding-ada-002</td>
            <td>1536</td>
            <td>$0.0001 / 1K tokens</td>
          </tr>
          <tr>
            <td>text-embedding-3-small</td>
            <td>512-1536</td>
            <td>$0.00002 / 1K tokens</td>
          </tr>
          <tr>
            <td>text-embedding-3-large</td>
            <td>256-3072</td>
            <td>$0.00013 / 1K tokens</td>
          </tr>
        </table>

        <h3>Vector Storage Options</h3>
        <ul>
          <li><strong>Local Storage:</strong> Simple, offline, limited (~10MB)</li>
          <li><strong>IndexedDB:</strong> Larger storage (~50MB+), better performance</li>
          <li><strong>Pinecone/Weaviate:</strong> Scalable, fast, advanced features</li>
        </ul>

        <h3>Cosine Similarity</h3>
        <p>Measures the angle between two vectors (0-1 scale):</p>
        <ul>
          <li>1.0 = Identical direction (highly similar)</li>
          <li>0.8-1.0 = Highly relevant</li>
          <li>0.7-0.8 = Relevant</li>
          <li>0.5-0.7 = Somewhat related</li>
          <li>0.0 = Orthogonal (unrelated)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 3,
          language: 'typescript',
          title: 'RAG Service - Embeddings and Semantic Search',
          code: `// src/app/services/ai-tutor/rag.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';
import { StorageService } from '@app/services/storage/storage.service';

export interface LessonChunk {
  id: string;
  lessonId: number;
  sectionTitle: string;
  content: string;
  codeSnippets: CodeSnippet[];
  concepts: string[];
  chunkIndex: number;
  embedding?: number[];
}

export interface EmbeddedChunk extends LessonChunk {
  embedding: number[];
}

export interface RelevantChunk extends EmbeddedChunk {
  similarity: number;
}

@Injectable({
  providedIn: 'root'
})
export class RAGService {
  private readonly CHUNK_SIZE = 800;
  private readonly CHUNK_OVERLAP = 200;
  private readonly TOP_K = 5;
  private embeddingsCache = new Map<number, EmbeddedChunk[]>();

  constructor(
    private aiService: AIIntegrationService,
    private storage: StorageService
  ) {}

  /**
   * Embed lesson content and store embeddings
   */
  async embedLessonContent(lessonId: number, lesson: any): Promise<void> {
    console.log(\`Embedding lesson \${lessonId}...\`);

    // 1. Chunk lesson content
    const chunks = this.chunkLessonContent(lesson);
    console.log(\`Created \${chunks.length} chunks\`);

    // 2. Generate embeddings for each chunk
    const embeddedChunks: EmbeddedChunk[] = [];

    for (const chunk of chunks) {
      try {
        const embedding = await this.generateEmbedding(chunk.content);
        embeddedChunks.push({ ...chunk, embedding });
      } catch (error) {
        console.error(\`Error embedding chunk \${chunk.id}:\`, error);
      }
      await this.delay(200); // Rate limiting
    }

    // 3. Store embeddings
    this.embeddingsCache.set(lessonId, embeddedChunks);
    await this.saveEmbeddingsToStorage();

    console.log(\`Successfully embedded lesson \${lessonId}\`);
  }

  /**
   * Find relevant lesson chunks for a question
   */
  async findRelevantContext(
    question: string,
    lessonId: number,
    topK: number = this.TOP_K
  ): Promise<RelevantChunk[]> {
    // 1. Check if lesson is embedded
    if (!this.embeddingsCache.has(lessonId)) {
      throw new Error(\`Lesson \${lessonId} not embedded yet\`);
    }

    const chunks = this.embeddingsCache.get(lessonId)!;

    // 2. Generate embedding for question
    const questionEmbedding = await this.generateEmbedding(question);

    // 3. Calculate similarity scores
    const scoredChunks = chunks.map(chunk => ({
      ...chunk,
      similarity: this.cosineSimilarity(questionEmbedding, chunk.embedding)
    }));

    // 4. Sort by similarity and take top K
    const relevant = scoredChunks
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .filter(chunk => chunk.similarity > 0.7);

    return relevant;
  }

  /**
   * Generate embedding using OpenAI API
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.aiService.generateEmbedding({
      input: text,
      model: 'text-embedding-ada-002'
    });
    return response.embedding;
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (normA * normB);
  }

  /**
   * Chunk lesson content into semantic pieces
   */
  private chunkLessonContent(lesson: any): LessonChunk[] {
    const chunks: LessonChunk[] = [];
    let chunkIndex = 0;

    lesson.sections.forEach((section: any) => {
      const sectionContent = this.stripHtml(section.content);
      const sectionChunks = this.splitIntoChunks(
        sectionContent,
        this.CHUNK_SIZE,
        this.CHUNK_OVERLAP
      );

      sectionChunks.forEach((chunkContent, idx) => {
        chunks.push({
          id: \`lesson\${lesson.id}_section\${section.id}_chunk\${idx}\`,
          lessonId: lesson.id,
          sectionTitle: section.title,
          content: chunkContent,
          codeSnippets: section.codeSnippets || [],
          concepts: this.extractConcepts(chunkContent),
          chunkIndex: chunkIndex++
        });
      });
    });

    return chunks;
  }

  private splitIntoChunks(text: string, chunkSize: number, overlap: number): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      chunks.push(text.substring(start, end).trim());
      start += chunkSize - overlap;
    }

    return chunks.filter(chunk => chunk.length > 50);
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, ' ').replace(/\\s+/g, ' ').trim();
  }

  private extractConcepts(text: string): string[] {
    const concepts: string[] = [];
    const terms = ['Observable', 'Promise', 'async', 'component', 'service'];
    terms.forEach(term => {
      if (text.toLowerCase().includes(term.toLowerCase())) {
        concepts.push(term);
      }
    });
    return concepts;
  }

  private async saveEmbeddingsToStorage(): Promise<void> {
    const toStore: Record<number, EmbeddedChunk[]> = {};
    this.embeddingsCache.forEach((chunks, lessonId) => {
      toStore[lessonId] = chunks;
    });
    await this.storage.set('lesson_embeddings', toStore);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}`,
          copyable: true
        },
        {
          id: 4,
          language: 'typescript',
          title: 'Context Building for Prompts',
          code: `/**
 * Build contextual prompt with relevant chunks
 */
buildContextualPrompt(
  question: string,
  relevantChunks: RelevantChunk[]
): string {
  if (relevantChunks.length === 0) {
    return \`Question: \${question}\\n\\nNote: No directly relevant lesson content found.\`;
  }

  let prompt = 'Relevant lesson content:\\n\\n';

  relevantChunks.forEach((chunk, index) => {
    prompt += \`[Context \${index + 1} - \${chunk.sectionTitle}]\\n\`;
    prompt += \`\${chunk.content}\\n\`;

    if (chunk.codeSnippets.length > 0) {
      prompt += '\\nCode examples:\\n';
      chunk.codeSnippets.forEach(snippet => {
        prompt += \`\\\`\\\`\\\`\${snippet.language}\\n\${snippet.code}\\n\\\`\\\`\\\`\\n\`;
      });
    }

    prompt += '\\n---\\n\\n';
  });

  prompt += \`Student question: \${question}\\n\\n\`;
  prompt += 'Please answer based on the lesson content provided above.';

  return prompt;
}

/**
 * Token-aware context injection
 */
tokenAwareContext(
  question: string,
  chunks: RelevantChunk[],
  maxTokens: number = 2000
): string {
  let prompt = '';
  let usedTokens = this.estimateTokens(question);

  const sorted = [...chunks].sort((a, b) => b.similarity - a.similarity);

  for (const chunk of sorted) {
    const chunkTokens = this.estimateTokens(chunk.content);

    if (usedTokens + chunkTokens > maxTokens) {
      break;
    }

    prompt += \`[\${chunk.sectionTitle}]\\n\${chunk.content}\\n\\n\`;
    usedTokens += chunkTokens;
  }

  prompt += \`Question: \${question}\`;
  return prompt;
}

private estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'RAG benefits: Accuracy (lesson-based), no hallucination, up-to-date content, traceable sources',
        'Chunking: 600-1000 chars, 20-30% overlap, respect paragraph boundaries for context continuity',
        'Embeddings: text-embedding-ada-002 (1536 dims, $0.0001/1K tokens), captures semantic meaning',
        'Cosine similarity: Dot product / (norm A × norm B), range 0-1, threshold 0.7+ for relevance',
        'Storage: LocalStorage (simple), IndexedDB (better), Pinecone (scalable), choose based on scale'
      ]
    },
    {
      id: 302,
      title: 'Lesson-Aware Prompting',
      content: `
        <h2>System Prompts for Tutoring</h2>
        <p>Effective prompts guide AI behavior and inject lesson context to provide accurate, personalized tutoring. System prompts define the tutor's role, knowledge, and teaching approach.</p>

        <h3>System Prompt Components</h3>
        <ul>
          <li><strong>Role Definition:</strong> "You are an expert Ionic development tutor"</li>
          <li><strong>Lesson Context:</strong> Current lesson title, topics, key concepts</li>
          <li><strong>Student Background:</strong> Completed lessons, struggles, strengths</li>
          <li><strong>Teaching Guidelines:</strong> How to explain, when to give examples</li>
          <li><strong>Response Format:</strong> Markdown, code blocks, structure</li>
          <li><strong>Constraints:</strong> Don't give full solutions, guide discovery</li>
        </ul>

        <h3>Context Injection Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Approach</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Inline</td>
            <td>Inject chunks directly into prompt</td>
            <td>Simple, small context</td>
          </tr>
          <tr>
            <td>Structured</td>
            <td>Organize by sections with labels</td>
            <td>Multiple chunks, clarity</td>
          </tr>
          <tr>
            <td>Hierarchical</td>
            <td>Prioritize by relevance score</td>
            <td>Best for semantic search</td>
          </tr>
          <tr>
            <td>Token-Aware</td>
            <td>Manage token budget intelligently</td>
            <td>Production, cost control</td>
          </tr>
        </table>

        <h3>Prompt Engineering Best Practices</h3>
        <ul>
          <li>Be specific about role and behavior</li>
          <li>Provide clear examples of desired output</li>
          <li>Set constraints (no full solutions)</li>
          <li>Inject relevant context, not everything</li>
          <li>Format clearly (sections, code blocks)</li>
          <li>Adapt temperature (0.3 = focused, 0.7 = creative)</li>
          <li>Test with edge cases</li>
          <li>Iterate based on response quality</li>
        </ul>

        <h3>Progressive Disclosure</h3>
        <p>Reveal information gradually to prevent overwhelming students:</p>
        <ol>
          <li><strong>First Response:</strong> High-level concept, ask clarifying questions</li>
          <li><strong>Second Response:</strong> More details, simple example</li>
          <li><strong>Third Response:</strong> Code example, best practices</li>
          <li><strong>Fourth Response:</strong> Advanced patterns, edge cases</li>
        </ol>

        <h3>Temperature Settings</h3>
        <table>
          <tr>
            <th>Temperature</th>
            <th>Behavior</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>0.0 - 0.3</td>
            <td>Deterministic, focused</td>
            <td>Code review, factual answers</td>
          </tr>
          <tr>
            <td>0.4 - 0.7</td>
            <td>Balanced, varied</td>
            <td>Tutoring, explanations</td>
          </tr>
          <tr>
            <td>0.8 - 1.0</td>
            <td>Creative, diverse</td>
            <td>Analogies, multiple approaches</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 5,
          language: 'typescript',
          title: 'Tutor Prompt Builder Service',
          code: `// src/app/services/ai-tutor/tutor-prompt-builder.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorPromptBuilder {
  /**
   * Build system prompt with lesson context
   */
  buildSystemPrompt(lesson: any, profile: StudentProfile): string {
    const completedLessonsText = profile.completedLessons.join(', ');
    const strugglesText = profile.strugglingConcepts.join(', ') || 'None';
    const strengthsText = profile.strengths.join(', ') || 'Building foundation';

    return \`You are an expert Ionic and Angular development tutor helping a student learn "\${lesson.title}".

LESSON CONTEXT:
- Current Lesson: \${lesson.id} - \${lesson.title}
- Level: \${lesson.category}
- Key Topics: \${this.extractKeyTopics(lesson)}

STUDENT BACKGROUND:
- Completed Lessons: \${completedLessonsText || 'None (beginner)'}
- Current Challenges: \${strugglesText}
- Strengths: \${strengthsText}
- Preferred Style: \${profile.preferredExplanationStyle}

YOUR ROLE:
- Explain concepts clearly with examples from the lesson
- Reference completed lessons when building on prior knowledge
- Provide TypeScript and Ionic code examples when helpful
- Ask clarifying questions to understand confusion
- Encourage hands-on practice
- Be patient, supportive, and encouraging
- Don't give complete solutions immediately - guide discovery

TEACHING GUIDELINES:
1. Use TypeScript and Ionic patterns from the lessons
2. Reference specific code snippets when relevant
3. Build on foundational concepts progressively
4. Relate new concepts to previously learned material
5. Suggest practice exercises when appropriate
6. Use analogies and real-world examples

RESPONSE FORMAT:
- Use markdown for formatting
- Use code blocks with language tags
- Use bullet points for lists
- Keep explanations concise but thorough\`;
  }

  /**
   * Build tutoring prompt with conversation history
   */
  buildTutoringPrompt(
    question: string,
    context: {
      lessonId: number;
      relevantChunks: RelevantChunk[];
      profile: StudentProfile;
    },
    conversationHistory: TutorMessage[]
  ): Message[] {
    const messages: Message[] = [];

    // 1. System prompt
    const lesson = { id: context.lessonId, title: \`Lesson \${context.lessonId}\` };
    messages.push({
      role: 'system',
      content: this.buildSystemPrompt(lesson, context.profile)
    });

    // 2. Inject relevant lesson content
    if (context.relevantChunks.length > 0) {
      const lessonContext = this.formatLessonContext(context.relevantChunks);
      messages.push({
        role: 'system',
        content: \`RELEVANT LESSON CONTENT:\\n\\n\${lessonContext}\`,
        copyable: true
      });
    }

    // 3. Add recent conversation history
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.role === 'student' ? 'user' : 'assistant',
        content: msg.content
      });
    });

    // 4. Current question
    messages.push({
      role: 'user',
      content: question
    });

    return messages;
  }

  /**
   * Build Socratic teaching prompt
   */
  buildSocraticPrompt(question: string, context: any): Message[] {
    return [
      {
        role: 'system',
        content: \`You are a Socratic tutor. Ask guiding questions instead of giving direct answers.

GUIDELINES:
- Ask 1-2 thoughtful questions per response
- Build on student's current knowledge
- Progressively hint at the solution
- Eventually provide answer if stuck

PROGRESSION:
1. First: Clarifying questions
2. Second: Guiding questions
3. Third: Direct hints
4. Fourth: Provide answer with explanation\`
      },
      {
        role: 'user',
        content: question
      }
    ];
  }

  /**
   * Build code review prompt
   */
  buildCodeReviewPrompt(code: string, language: string, context: string): Message[] {
    return [
      {
        role: 'system',
        content: \`You are an expert code reviewer for \${language}.

REVIEW FOCUS:
- Syntax errors and bugs
- Logic issues and edge cases
- Performance optimization
- Security vulnerabilities
- Best practices
- Type safety

Be constructive and educational.\`
      },
      {
        role: 'user',
        content: \`Review this \${language} code:\\n\\nContext: \${context}\\n\\n\\\`\\\`\\\`\${language}\\n\${code}\\n\\\`\\\`\\\`\`
      }
    ];
  }

  private formatLessonContext(chunks: RelevantChunk[]): string {
    return chunks.map((chunk, index) => {
      let formatted = \`[Section \${index + 1}: \${chunk.sectionTitle}]\\n\`;
      formatted += \`\${chunk.content}\\n\`;
      return formatted;
    }).join('\\n---\\n\\n');
  }

  private extractKeyTopics(lesson: any): string {
    return lesson.sections?.slice(0, 5).map((s: any) => s.title).join(', ') || 'Core concepts';
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'System prompt: Define role, lesson context, student background, teaching guidelines, response format',
        'Context injection: RAG finds relevant chunks, format clearly, balance context vs token limits',
        'Progressive disclosure: Start high-level, add details gradually based on student responses',
        'Temperature: 0.3 (code review), 0.7 (tutoring), 1.0 (creative analogies)',
        'Token management: Estimate 4 chars/token, prioritize most relevant chunks, stay within limits'
      ]
    },
    {
      id: 303,
      title: 'Code Explanation & Review',
      content: `
        <h2>AI-Powered Code Review</h2>
        <p>AI can analyze student code to identify issues, suggest improvements, and explain patterns. This provides instant, detailed feedback without requiring human reviewers.</p>

        <h3>Code Review Focus Areas</h3>
        <ul>
          <li><strong>Syntax Errors:</strong> Parse code, identify compilation issues</li>
          <li><strong>Logic Issues:</strong> Detect bugs, edge cases, incorrect assumptions</li>
          <li><strong>Performance:</strong> Inefficient loops, unnecessary operations</li>
          <li><strong>Security:</strong> SQL injection, XSS, insecure patterns</li>
          <li><strong>Best Practices:</strong> Ionic/Angular patterns from lessons</li>
          <li><strong>Type Safety:</strong> TypeScript type issues, any abuse</li>
          <li><strong>Readability:</strong> Code style, naming, complexity</li>
        </ul>

        <h3>Review Response Structure</h3>
        <ol>
          <li><strong>Summary:</strong> Brief overall assessment (2-3 sentences)</li>
          <li><strong>Issues:</strong> List specific problems found with line numbers</li>
          <li><strong>Suggestions:</strong> Improvements with code examples</li>
          <li><strong>Best Practices:</strong> Relevant patterns from lessons</li>
          <li><strong>Security:</strong> Any security concerns identified</li>
          <li><strong>Performance:</strong> Optimization tips if applicable</li>
        </ol>

        <h3>Code Parsing Strategies</h3>
        <table>
          <tr>
            <th>Approach</th>
            <th>Method</th>
            <th>Accuracy</th>
          </tr>
          <tr>
            <td>AI Only</td>
            <td>Pass code to GPT, let it analyze</td>
            <td>Good for most cases</td>
          </tr>
          <tr>
            <td>AST + AI</td>
            <td>Parse to AST, AI analyzes structure</td>
            <td>Better for complex code</td>
          </tr>
          <tr>
            <td>Linter + AI</td>
            <td>Run ESLint/TSLint, AI explains issues</td>
            <td>Best for production</td>
          </tr>
        </table>

        <h3>Feedback Guidelines</h3>
        <ul>
          <li>Be constructive and encouraging</li>
          <li>Explain WHY something is an issue</li>
          <li>Provide corrected code examples</li>
          <li>Reference lesson concepts</li>
          <li>Prioritize critical issues first</li>
          <li>Suggest incremental improvements</li>
        </ul>

        <h3>Common TypeScript/Ionic Issues</h3>
        <ul>
          <li>Using <code>any</code> instead of proper types</li>
          <li>Not unsubscribing from Observables</li>
          <li>Missing error handling in async functions</li>
          <li>Improper lifecycle hook usage</li>
          <li>Tight coupling (not using dependency injection)</li>
          <li>Memory leaks (event listeners not removed)</li>
          <li>Improper use of async/await vs Observables</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 6,
          language: 'typescript',
          title: 'Code Review Service',
          code: `// src/app/services/ai-tutor/code-review.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';

export interface CodeReview {
  summary: string;
  issues: CodeIssue[];
  suggestions: CodeSuggestion[];
  bestPractices: string[];
  securityConcerns: string[];
  performanceNotes: string[];
  explanation: string;
}

export interface CodeIssue {
  severity: 'error' | 'warning' | 'info';
  line?: number;
  message: string;
  explanation: string;
}

export interface CodeSuggestion {
  title: string;
  description: string;
  before?: string;
  after?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodeReviewService {
  constructor(private aiService: AIIntegrationService) {}

  /**
   * Review student code with AI analysis
   */
  async reviewCode(
    code: string,
    language: string,
    context: string
  ): Promise<CodeReview> {
    const prompt = this.buildCodeReviewPrompt(code, language, context);

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.3, // Lower for focused, accurate analysis
      maxTokens: 1500
    });

    // Parse AI response into structured review
    return this.parseReviewResponse(response.content);
  }

  /**
   * Quick syntax check
   */
  async checkSyntax(code: string, language: string): Promise<CodeIssue[]> {
    const prompt = [
      {
        role: 'system',
        content: \`You are a \${language} syntax checker. Identify only syntax errors. Return JSON array of issues.\`,
        copyable: true
      },
      {
        role: 'user',
        content: \`Check syntax:\\n\\\`\\\`\\\`\${language}\\n\${code}\\n\\\`\\\`\\\`\`
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.1,
      maxTokens: 500
    });

    try {
      return JSON.parse(response.content);
    } catch {
      return [];
    }
  }

  /**
   * Explain code patterns
   */
  async explainCode(code: string, language: string): Promise<string> {
    const prompt = [
      {
        role: 'system',
        content: 'You are a code educator. Explain what this code does in simple terms.'
      },
      {
        role: 'user',
        content: \`Explain this \${language} code:\\n\\\`\\\`\\\`\${language}\\n\${code}\\n\\\`\\\`\\\`\`
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.5,
      maxTokens: 800
    });

    return response.content;
  }

  private buildCodeReviewPrompt(
    code: string,
    language: string,
    context: string
  ): Message[] {
    return [
      {
        role: 'system',
        content: \`You are an expert code reviewer for \${language} in Ionic/Angular.

REVIEW FOCUS:
- Syntax errors and bugs
- Logic issues and edge cases
- Performance optimization
- Security vulnerabilities
- Best practices from Ionic/Angular
- Type safety (TypeScript)

RESPONSE FORMAT:
1. Summary: Brief assessment
2. Issues: Specific problems with severity
3. Suggestions: Improvements with examples
4. Best Practices: Relevant patterns
5. Security: Concerns if any
6. Performance: Optimization tips

Be constructive and educational.\`
      },
      {
        role: 'user',
        content: \`Review this \${language} code:\\n\\nContext: \${context}\\n\\n\\\`\\\`\\\`\${language}\\n\${code}\\n\\\`\\\`\\\`\`
      }
    ];
  }

  private parseReviewResponse(content: string): CodeReview {
    // Simple parsing (in production, use more robust parsing or structured output)
    const sections = content.split(/\\n(?=\\d\\.)/);

    return {
      summary: this.extractSection(sections, 0),
      issues: this.extractIssues(sections),
      suggestions: this.extractSuggestions(sections),
      bestPractices: this.extractList(sections, 'Best Practices'),
      securityConcerns: this.extractList(sections, 'Security'),
      performanceNotes: this.extractList(sections, 'Performance'),
      explanation: content
    };
  }

  private extractSection(sections: string[], index: number): string {
    return sections[index]?.replace(/^\\d\\.\\s*\\w+:\\s*/, '').trim() || '';
  }

  private extractIssues(sections: string[]): CodeIssue[] {
    // Parse issues from section
    return [];
  }

  private extractSuggestions(sections: string[]): CodeSuggestion[] {
    return [];
  }

  private extractList(sections: string[], sectionName: string): string[] {
    const section = sections.find(s => s.includes(sectionName));
    if (!section) return [];

    return section
      .split('\\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\\s*/, '').trim());
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Code review areas: Syntax, logic, performance, security, best practices, type safety, readability',
        'Structured response: Summary, issues (severity + line), suggestions (before/after), practices, security, performance',
        'Temperature: 0.3 for focused analysis, 0.1 for syntax only, 0.5 for explanations',
        'Feedback style: Constructive, explain WHY, provide corrected examples, reference lessons',
        'Common Ionic issues: any abuse, no unsubscribe, missing error handling, lifecycle misuse, tight coupling'
      ]
    },
    {
      id: 304,
      title: 'Concept Clarification',
      content: `
        <h2>Multi-Approach Concept Explanation</h2>
        <p>Different students learn differently. Concept clarification provides multiple explanation approaches to match learning styles and ensure understanding.</p>

        <h3>Explanation Approaches</h3>
        <ul>
          <li><strong>Simple (ELI5):</strong> Explain like I'm 5, simple language, basic concepts</li>
          <li><strong>Detailed:</strong> Comprehensive, thorough, technical depth</li>
          <li><strong>Example:</strong> Code examples first, learn by seeing</li>
          <li><strong>Analogy:</strong> Real-world metaphors, relatable comparisons</li>
          <li><strong>Visual:</strong> Diagrams, flowcharts, mental models</li>
          <li><strong>Practical:</strong> Hands-on exercises, try it yourself</li>
        </ul>

        <h3>Detecting Confusion</h3>
        <p>Identify confusion from student questions:</p>
        <ul>
          <li>Keywords: "don't understand", "confused", "not clear", "why"</li>
          <li>Repeated questions on same topic</li>
          <li>Incorrect assumptions in questions</li>
          <li>Mixing up similar concepts</li>
          <li>Vague or unfocused questions</li>
        </ul>

        <h3>Clarification Strategy</h3>
        <ol>
          <li><strong>Detect:</strong> Identify the specific confusion point</li>
          <li><strong>Simplify:</strong> Break down into smaller concepts</li>
          <li><strong>Multiple Angles:</strong> Explain in 2-3 different ways</li>
          <li><strong>Examples:</strong> Provide concrete code examples</li>
          <li><strong>Analogies:</strong> Use real-world comparisons</li>
          <li><strong>Check:</strong> Ask questions to verify understanding</li>
        </ol>

        <h3>Analogy Examples</h3>
        <table>
          <tr>
            <th>Concept</th>
            <th>Analogy</th>
          </tr>
          <tr>
            <td>Observable</td>
            <td>Netflix stream - data flows over time, you subscribe to watch</td>
          </tr>
          <tr>
            <td>Promise</td>
            <td>Restaurant order - you get one result, either food or "sorry, we're out"</td>
          </tr>
          <tr>
            <td>Dependency Injection</td>
            <td>Restaurant waiter brings you what you need without asking</td>
          </tr>
          <tr>
            <td>Component Lifecycle</td>
            <td>Human life stages: birth (init), childhood (view init), adulthood, death (destroy)</td>
          </tr>
        </table>

        <h3>Visual Learning Support</h3>
        <p>For visual learners, provide:</p>
        <ul>
          <li>Mermaid diagrams (flowcharts, sequence diagrams)</li>
          <li>ASCII art for simple visualizations</li>
          <li>Code structure visualizations</li>
          <li>Links to relevant diagrams in lessons</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 7,
          language: 'typescript',
          title: 'Concept Clarifier Service',
          code: `// src/app/services/ai-tutor/concept-clarifier.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';

export interface Clarification {
  concept: string;
  simpleExplanation: string;
  detailedExplanation: string;
  codeExample?: string;
  analogy?: string;
  visualAid?: string;
  practiceExercise?: string;
  relatedConcepts: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConceptClarifier {
  constructor(private aiService: AIIntegrationService) {}

  /**
   * Clarify a concept with multiple approaches
   */
  async clarifyConcept(
    concept: string,
    studentQuestion: string,
    learningStyle: LearningStyle
  ): Promise<Clarification> {
    const prompt = this.buildClarificationPrompt(
      concept,
      studentQuestion,
      learningStyle
    );

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 1200
    });

    return this.parseClarificationResponse(response.content, concept);
  }

  /**
   * Detect confused concepts from question
   */
  detectConfusion(question: string): string[] {
    const confusedConcepts: string[] = [];

    // Confusion indicators
    const confusionKeywords = [
      'don\\'t understand', 'confused', 'not clear', 'what is',
      'how does', 'why', 'explain', 'difference between'
    ];

    // Check if question shows confusion
    const isConfused = confusionKeywords.some(keyword =>
      question.toLowerCase().includes(keyword)
    );

    if (!isConfused) return [];

    // Extract technical terms
    const technicalTerms = [
      'Observable', 'Promise', 'async', 'await', 'RxJS', 'Subject',
      'component', 'service', 'directive', 'pipe', 'module',
      'dependency injection', 'lifecycle', 'decorator',
      'Ionic', 'Angular', 'Capacitor', 'TypeScript'
    ];

    technicalTerms.forEach(term => {
      if (question.toLowerCase().includes(term.toLowerCase())) {
        confusedConcepts.push(term);
      }
    });

    return confusedConcepts;
  }

  /**
   * Generate analogy for concept
   */
  async generateAnalogy(concept: string): Promise<string> {
    const prompt = [
      {
        role: 'system',
        content: 'You are an expert at creating simple, memorable analogies for technical concepts.'
      },
      {
        role: 'user',
        content: \`Create a simple, real-world analogy for "\${concept}" in Ionic/Angular development. Make it relatable and memorable.\`,
        copyable: true
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.8,
      maxTokens: 200
    });

    return response.content;
  }

  /**
   * Simplify explanation (ELI5 style)
   */
  async simplifyExplanation(concept: string, technicalExplanation: string): Promise<string> {
    const prompt = [
      {
        role: 'system',
        content: 'You are an expert at explaining complex technical concepts in simple terms (ELI5 - Explain Like I\\'m 5).'
      },
      {
        role: 'user',
        content: \`Simplify this explanation of "\${concept}":\\n\\n\${technicalExplanation}\\n\\nMake it simple enough for a beginner to understand.\`
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.6,
      maxTokens: 300
    });

    return response.content;
  }

  private buildClarificationPrompt(
    concept: string,
    question: string,
    learningStyle: LearningStyle
  ): Message[] {
    const styleGuidance = this.getStyleGuidance(learningStyle);

    return [
      {
        role: 'system',
        content: \`You are an expert tutor clarifying "\${concept}" for a student.

LEARNING STYLE: \${learningStyle}
\${styleGuidance}

PROVIDE:
1. Simple Explanation (ELI5 style)
2. Detailed Explanation (comprehensive)
3. Code Example (TypeScript/Ionic)
4. Real-World Analogy
5. Visual Aid (describe or ASCII art)
6. Practice Exercise

Be clear, encouraging, and adaptive.\`
      },
      {
        role: 'user',
        content: \`I'm confused about "\${concept}". Specifically: \${question}\`
      }
    ];
  }

  private getStyleGuidance(style: LearningStyle): string {
    const guidance = {
      visual: 'Focus on diagrams, visualizations, and mental models. Describe visual representations.',
      verbal: 'Provide detailed text explanations with thorough descriptions.',
      practical: 'Emphasize hands-on code examples and exercises. Show how to use it.',
      theoretical: 'Explain WHY first, then HOW. Cover underlying principles and concepts.',
      mixed: 'Use a balanced approach with multiple explanation methods.'
    };

    return guidance[style] || guidance.mixed;
  }

  private parseClarificationResponse(content: string, concept: string): Clarification {
    // Parse sections (simplified - production would use more robust parsing)
    const sections = content.split(/\\n(?=\\d\\.)/);

    return {
      concept,
      simpleExplanation: this.extractSection(sections, 0),
      detailedExplanation: this.extractSection(sections, 1),
      codeExample: this.extractCodeBlock(content),
      analogy: this.extractSection(sections, 3),
      visualAid: this.extractSection(sections, 4),
      practiceExercise: this.extractSection(sections, 5),
      relatedConcepts: []
    };
  }

  private extractSection(sections: string[], index: number): string {
    return sections[index]?.replace(/^\\d\\.\\s*[^:]+:\\s*/, '').trim() || '';
  }

  private extractCodeBlock(content: string): string | undefined {
    const match = content.match(/\`\`\`[\\w]*\\n([\\s\\S]*?)\\n\`\`\`/);
    return match?.[1];
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Multiple approaches: Simple (ELI5), detailed, example-first, analogy, visual, practical - match learning style',
        'Detect confusion: Look for keywords (don\'t understand, confused), repeated questions, incorrect assumptions',
        'Clarification strategy: Detect specific confusion → Simplify → Multiple angles → Examples → Analogies → Check',
        'Good analogies: Observable = data stream, Promise = one-time delivery, DI = automatic delivery',
        'Visual learners: Provide Mermaid diagrams, ASCII art, code structure, links to lesson diagrams'
      ]
    },
    {
      id: 305,
      title: 'Interactive Quiz Generation',
      content: `
        <h2>AI-Generated Quizzes</h2>
        <p>Generate quiz questions from lesson content with adaptive difficulty, immediate feedback, and explanations to reinforce learning and identify knowledge gaps.</p>

        <h3>Question Types</h3>
        <ul>
          <li><strong>Multiple Choice:</strong> 4 options, one correct answer</li>
          <li><strong>Code Completion:</strong> Fill in missing code segments</li>
          <li><strong>Debugging:</strong> Find and fix errors in code</li>
          <li><strong>Concept Explanation:</strong> Explain a concept in own words</li>
          <li><strong>True/False:</strong> Simple factual questions</li>
          <li><strong>Code Output:</strong> Predict what code will output</li>
        </ul>

        <h3>Difficulty Levels</h3>
        <table>
          <tr>
            <th>Level</th>
            <th>Focus</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Easy</td>
            <td>Basic recall, syntax, simple concepts</td>
            <td>"What decorator marks a class as Injectable?"</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>Application, understanding, combining concepts</td>
            <td>"How do you unsubscribe from an Observable?"</td>
          </tr>
          <tr>
            <td>Hard</td>
            <td>Analysis, debugging, optimization, edge cases</td>
            <td>"Why does this Observable cause a memory leak?"</td>
          </tr>
        </table>

        <h3>Adaptive Difficulty</h3>
        <p>Adjust question difficulty based on performance:</p>
        <ul>
          <li>Start at student's estimated level (based on profile)</li>
          <li>Increase difficulty after 2-3 correct answers</li>
          <li>Decrease difficulty after 2 incorrect answers</li>
          <li>Track concept mastery per question</li>
          <li>Focus on struggling concepts</li>
        </ul>

        <h3>Immediate Feedback</h3>
        <p>Provide instant, educational feedback:</p>
        <ul>
          <li><strong>Correct:</strong> Confirm answer, explain WHY it's correct, add context</li>
          <li><strong>Incorrect:</strong> Explain misconception, show correct answer, teach concept</li>
          <li><strong>Partial:</strong> Acknowledge what's right, guide to complete answer</li>
        </ul>

        <h3>Quiz Metrics</h3>
        <ul>
          <li>Questions answered (total count)</li>
          <li>Correct answers (accuracy percentage)</li>
          <li>Average time per question</li>
          <li>Concepts mastered (80%+ accuracy)</li>
          <li>Concepts needing review (< 70% accuracy)</li>
          <li>Difficulty progression</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 8,
          language: 'typescript',
          title: 'Quiz Generator Service',
          code: `// src/app/services/ai-tutor/quiz-generator.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';

export interface Quiz {
  id: string;
  lessonId: number;
  questions: QuizQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'code-completion' | 'debugging' | 'concept' | 'true-false' | 'code-output';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number; // 1-10
  concept: string;
  codeSnippet?: string;
}

export interface QuizResult {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  timeTaken: number; // Seconds
  feedback: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizGenerator {
  constructor(private aiService: AIIntegrationService) {}

  /**
   * Generate quiz from lesson content
   */
  async generateQuiz(
    lesson: any,
    difficulty: 'easy' | 'medium' | 'hard',
    questionCount: number
  ): Promise<Quiz> {
    const prompt = this.buildQuizGenerationPrompt(lesson, difficulty, questionCount);

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 2000
    });

    // Parse JSON response
    const questions = this.parseQuizResponse(response.content);

    return {
      id: crypto.randomUUID(),
      lessonId: lesson.id,
      questions,
      difficulty,
      createdAt: new Date()
    };
  }

  /**
   * Generate adaptive next question
   */
  async generateAdaptiveQuestion(
    lessonId: number,
    recentResults: QuizResult[],
    concepts: string[]
  ): Promise<QuizQuestion> {
    // Calculate current difficulty based on recent performance
    const difficulty = this.calculateAdaptiveDifficulty(recentResults);

    // Identify struggling concepts
    const strugglingConcepts = this.identifyStrugglingConcepts(recentResults);

    const prompt = this.buildAdaptiveQuestionPrompt(
      lessonId,
      difficulty,
      strugglingConcepts.length > 0 ? strugglingConcepts[0] : concepts[0]
    );

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 500
    });

    return this.parseQuizResponse(response.content)[0];
  }

  /**
   * Get feedback for answer
   */
  async getFeedback(
    question: QuizQuestion,
    userAnswer: string,
    correct: boolean
  ): Promise<string> {
    const prompt = [
      {
        role: 'system',
        content: 'You are an encouraging tutor providing quiz feedback.'
      },
      {
        role: 'user',
        content: \`Question: \${question.question}
Correct Answer: \${question.correctAnswer}
User Answer: \${userAnswer}
Result: \${correct ? 'Correct' : 'Incorrect'}

Provide \${correct ? 'encouraging feedback and additional context' : 'explanation of the misconception and teach the correct concept'}.\`,
        copyable: true
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.6,
      maxTokens: 300
    });

    return response.content;
  }

  private buildQuizGenerationPrompt(
    lesson: any,
    difficulty: string,
    count: number
  ): Message[] {
    return [
      {
        role: 'system',
        content: \`You are a quiz generator for Ionic/Angular education.

LESSON: \${lesson.title}
DIFFICULTY: \${difficulty}
QUESTIONS: \${count}

Generate \${count} questions of \${difficulty} difficulty.

QUESTION TYPES:
- Multiple choice (4 options)
- Code completion
- Debugging
- Concept explanation

DIFFICULTY LEVELS:
- Easy: Basic recall, syntax
- Medium: Application, understanding
- Hard: Analysis, debugging, optimization

RESPONSE FORMAT (JSON):
{
  "questions": [
    {
      "type": "multiple-choice",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "B",
      "explanation": "Why B is correct",
      "difficulty": 5,
      "concept": "Concept name"
    }
  ]
}\`
      },
      {
        role: 'user',
        content: \`Generate \${count} \${difficulty} questions for: \${lesson.title}\`
      }
    ];
  }

  private buildAdaptiveQuestionPrompt(
    lessonId: number,
    difficulty: number,
    concept: string
  ): Message[] {
    return [
      {
        role: 'system',
        content: \`Generate ONE quiz question for lesson \${lessonId}.

DIFFICULTY: \${difficulty}/10
FOCUS CONCEPT: \${concept}

Return JSON for one question.\`
      },
      {
        role: 'user',
        content: \`Generate question focusing on "\${concept}" at difficulty \${difficulty}/10\`
      }
    ];
  }

  private calculateAdaptiveDifficulty(results: QuizResult[]): number {
    if (results.length === 0) return 5; // Start medium

    const recent = results.slice(-5);
    const accuracy = recent.filter(r => r.correct).length / recent.length;

    // Adjust difficulty based on accuracy
    if (accuracy >= 0.8) return Math.min(10, 7); // Increase
    if (accuracy <= 0.4) return Math.max(1, 3);  // Decrease
    return 5; // Stay medium
  }

  private identifyStrugglingConcepts(results: QuizResult[]): string[] {
    // Group by concept, find low accuracy
    return [];
  }

  private parseQuizResponse(content: string): QuizQuestion[] {
    try {
      const parsed = JSON.parse(content);
      return parsed.questions || [];
    } catch {
      return [];
    }
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Question types: Multiple choice, code completion, debugging, concept explanation, true/false, code output',
        'Difficulty adaptation: Start at student level, +1 after 2-3 correct, -1 after 2 incorrect, focus on struggles',
        'Immediate feedback: Correct (confirm + context), incorrect (explain misconception + teach correct concept)',
        'Quiz metrics: Questions answered, accuracy %, time per question, concepts mastered (80%+), needs review (<70%)',
        'Generation: Use AI with lesson context, difficulty level, question count, parse JSON response'
      ]
    },
    {
      id: 306,
      title: 'Study Plan Generation & Progress Tracking',
      content: `
        <h2>Personalized Study Plans</h2>
        <p>Generate customized study plans based on student progress, identified gaps, and learning goals. Track progress over time to measure effectiveness and adapt the plan.</p>

        <h3>Study Plan Components</h3>
        <ul>
          <li><strong>Goals:</strong> What the student wants to achieve</li>
          <li><strong>Milestones:</strong> Key checkpoints along the way</li>
          <li><strong>Daily Tasks:</strong> Specific actions to complete each day</li>
          <li><strong>Review Schedule:</strong> Spaced repetition for retention</li>
          <li><strong>Practice Exercises:</strong> Hands-on coding tasks</li>
          <li><strong>Estimated Duration:</strong> Time to complete plan</li>
        </ul>

        <h3>Gap Analysis</h3>
        <p>Identify knowledge gaps by analyzing:</p>
        <ul>
          <li>Incomplete lessons</li>
          <li>Low concept mastery scores (< 70%)</li>
          <li>Struggling concepts from interactions</li>
          <li>Quiz performance by topic</li>
          <li>Time since last practice</li>
        </ul>

        <h3>Progress Tracking Metrics</h3>
        <table>
          <tr>
            <th>Metric</th>
            <th>Description</th>
            <th>Target</th>
          </tr>
          <tr>
            <td>Concept Mastery</td>
            <td>Average mastery across all concepts</td>
            <td>80%+</td>
          </tr>
          <tr>
            <td>Learning Velocity</td>
            <td>Lessons completed per week</td>
            <td>2-3 lessons/week</td>
          </tr>
          <tr>
            <td>Study Time</td>
            <td>Total time spent learning</td>
            <td>5-10 hours/week</td>
          </tr>
          <tr>
            <td>Quiz Accuracy</td>
            <td>Percentage of correct answers</td>
            <td>75%+</td>
          </tr>
          <tr>
            <td>Retention Rate</td>
            <td>Quiz performance 1 week later</td>
            <td>70%+</td>
          </tr>
        </table>

        <h3>Spaced Repetition</h3>
        <p>Review schedule for optimal retention:</p>
        <ul>
          <li><strong>Day 1:</strong> Initial learning</li>
          <li><strong>Day 2:</strong> First review (24 hours)</li>
          <li><strong>Day 7:</strong> Second review (1 week)</li>
          <li><strong>Day 30:</strong> Third review (1 month)</li>
          <li><strong>Day 90:</strong> Final review (3 months)</li>
        </ul>

        <h3>Analytics Visualization</h3>
        <ul>
          <li>Progress over time (line chart)</li>
          <li>Concept mastery radar chart</li>
          <li>Study time distribution (bar chart)</li>
          <li>Strengths vs weaknesses (comparison)</li>
          <li>Learning velocity trend</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 9,
          language: 'typescript',
          title: 'Study Plan Generator Service',
          code: `// src/app/services/ai-tutor/study-plan-generator.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';
import { StudentProfileManager } from './student-profile-manager.service';

export interface StudyPlan {
  id: string;
  studentId: string;
  goals: string[];
  milestones: Milestone[];
  dailyTasks: StudyTask[];
  reviewSchedule: ReviewSession[];
  practiceExercises: Exercise[];
  estimatedDuration: number; // Days
  createdAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  lessons: number[];
  concepts: string[];
  completed: boolean;
}

export interface StudyTask {
  id: string;
  date: Date;
  task: string;
  lessonId?: number;
  concept?: string;
  estimatedMinutes: number;
  completed: boolean;
}

export interface ReviewSession {
  id: string;
  date: Date;
  lessonId: number;
  concepts: string[];
  reviewType: 'quiz' | 'practice' | 'reading';
}

@Injectable({
  providedIn: 'root'
})
export class StudyPlanGenerator {
  constructor(
    private aiService: AIIntegrationService,
    private profileManager: StudentProfileManager
  ) {}

  /**
   * Generate personalized study plan
   */
  async generateStudyPlan(
    studentId: string,
    targetConcepts: string[],
    timeAvailable: number // Hours per week
  ): Promise<StudyPlan> {
    // 1. Get student profile
    const profile = await this.profileManager.getProfile(studentId);

    // 2. Perform gap analysis
    const gaps = this.analyzeGaps(profile, targetConcepts);

    // 3. Generate plan with AI
    const prompt = this.buildStudyPlanPrompt(profile, gaps, timeAvailable);

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 1500
    });

    // 4. Parse and structure plan
    const plan = this.parseStudyPlan(response.content, studentId);

    // 5. Add spaced repetition schedule
    plan.reviewSchedule = this.generateReviewSchedule(plan);

    return plan;
  }

  /**
   * Analyze knowledge gaps
   */
  private analyzeGaps(
    profile: StudentProfile,
    targetConcepts: string[]
  ): KnowledgeGap[] {
    const gaps: KnowledgeGap[] = [];

    // 1. Find low mastery concepts
    profile.conceptsMastered.forEach(cm => {
      if (cm.masteryLevel < 70) {
        gaps.push({
          type: 'low_mastery',
          concept: cm.concept,
          severity: 100 - cm.masteryLevel,
          lessonId: cm.lessonId
        });
      }
    });

    // 2. Find missing target concepts
    targetConcepts.forEach(concept => {
      const mastered = profile.conceptsMastered.find(cm => cm.concept === concept);
      if (!mastered) {
        gaps.push({
          type: 'missing',
          concept,
          severity: 100,
          lessonId: undefined
        });
      }
    });

    // 3. Find struggling concepts
    profile.strugglingConcepts.forEach(concept => {
      if (!gaps.find(g => g.concept === concept)) {
        gaps.push({
          type: 'struggling',
          concept,
          severity: 80,
          lessonId: undefined
        });
      }
    });

    // Sort by severity
    return gaps.sort((a, b) => b.severity - a.severity);
  }

  /**
   * Generate spaced repetition schedule
   */
  private generateReviewSchedule(plan: StudyPlan): ReviewSession[] {
    const schedule: ReviewSession[] = [];
    const startDate = new Date();

    // Spaced repetition intervals (days)
    const intervals = [1, 7, 30, 90];

    plan.milestones.forEach(milestone => {
      intervals.forEach(interval => {
        const reviewDate = new Date(startDate);
        reviewDate.setDate(reviewDate.getDate() + interval);

        schedule.push({
          id: crypto.randomUUID(),
          date: reviewDate,
          lessonId: milestone.lessons[0],
          concepts: milestone.concepts,
          reviewType: interval === 1 ? 'quiz' : interval === 7 ? 'practice' : 'reading'
        });
      });
    });

    return schedule;
  }

  private buildStudyPlanPrompt(
    profile: StudentProfile,
    gaps: KnowledgeGap[],
    hoursPerWeek: number
  ): Message[] {
    const gapsSummary = gaps.map(g => \`\${g.concept} (severity: \${g.severity})\`).join(', ');

    return [
      {
        role: 'system',
        content: \`You are a personalized learning plan generator.

STUDENT PROFILE:
- Completed Lessons: \${profile.completedLessons.join(', ')}
- Strengths: \${profile.strengths.join(', ')}
- Struggles: \${profile.strugglingConcepts.join(', ')}

KNOWLEDGE GAPS:
\${gapsSummary}

TIME AVAILABLE: \${hoursPerWeek} hours/week

GENERATE:
1. Learning goals (3-5)
2. Milestones with lessons and concepts
3. Daily study tasks
4. Practice exercises
5. Estimated duration

Be realistic and achievable.\`,
        copyable: true
      },
      {
        role: 'user',
        content: \`Generate a study plan to address these gaps with \${hoursPerWeek} hours per week.\`
      }
    ];
  }

  private parseStudyPlan(content: string, studentId: string): StudyPlan {
    // Simplified parsing (production would be more robust)
    return {
      id: crypto.randomUUID(),
      studentId,
      goals: [],
      milestones: [],
      dailyTasks: [],
      reviewSchedule: [],
      practiceExercises: [],
      estimatedDuration: 30,
      createdAt: new Date()
    };
  }
}

interface KnowledgeGap {
  type: 'low_mastery' | 'missing' | 'struggling';
  concept: string;
  severity: number;
  lessonId?: number;
}`,
          copyable: true
        },
        {
          id: 10,
          language: 'typescript',
          title: 'Learning Analytics Service',
          code: `// src/app/services/ai-tutor/learning-analytics.service.ts
import { Injectable } from '@angular/core';
import { StudentProfileManager } from './student-profile-manager.service';

export interface ProgressReport {
  overallProgress: number; // 0-100
  conceptMastery: Map<string, number>;
  strengthsWeaknesses: StrengthsWeaknesses;
  learningVelocity: number; // Lessons/week
  recommendedFocus: string[];
  studyTimeDistribution: StudyTimeData[];
  retentionRate: number;
  trendsOverTime: TrendData[];
}

export interface StrengthsWeaknesses {
  strengths: ConceptScore[];
  weaknesses: ConceptScore[];
}

export interface ConceptScore {
  concept: string;
  score: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface StudyTimeData {
  lessonId: number;
  timeSpent: number;
  date: Date;
}

export interface TrendData {
  date: Date;
  value: number;
  metric: 'mastery' | 'velocity' | 'accuracy';
}

@Injectable({
  providedIn: 'root'
})
export class LearningAnalytics {
  constructor(private profileManager: StudentProfileManager) {}

  /**
   * Analyze learning progress
   */
  async analyzeLearningProgress(studentId: string): Promise<ProgressReport> {
    const profile = await this.profileManager.getProfile(studentId);

    // Calculate overall progress
    const totalLessons = 30; // Total available
    const overallProgress = (profile.completedLessons.length / totalLessons) * 100;

    // Concept mastery map
    const conceptMastery = new Map<string, number>();
    profile.conceptsMastered.forEach(cm => {
      conceptMastery.set(cm.concept, cm.masteryLevel);
    });

    // Identify strengths and weaknesses
    const strengthsWeaknesses = this.identifyStrengthsWeaknesses(profile);

    // Calculate learning velocity
    const velocity = this.calculateLearningVelocity(profile);

    // Recommend focus areas
    const recommendedFocus = this.recommendFocusAreas(profile);

    return {
      overallProgress,
      conceptMastery,
      strengthsWeaknesses,
      learningVelocity: velocity,
      recommendedFocus,
      studyTimeDistribution: [],
      retentionRate: 0,
      trendsOverTime: []
    };
  }

  /**
   * Track interaction for analytics
   */
  trackInteraction(studentId: string, interaction: TutorInteraction): void {
    // Store interaction for later analysis
    const key = \`interactions_\${studentId}\`;
    const stored = localStorage.getItem(key);
    const interactions = stored ? JSON.parse(stored) : [];

    interactions.push({
      ...interaction,
      timestamp: new Date()
    });

    localStorage.setItem(key, JSON.stringify(interactions));
  }

  private identifyStrengthsWeaknesses(profile: StudentProfile): StrengthsWeaknesses {
    const strengths: ConceptScore[] = [];
    const weaknesses: ConceptScore[] = [];

    profile.conceptsMastered.forEach(cm => {
      const score: ConceptScore = {
        concept: cm.concept,
        score: cm.masteryLevel,
        trend: 'stable'
      };

      if (cm.masteryLevel >= 80) {
        strengths.push(score);
      } else if (cm.masteryLevel < 70) {
        weaknesses.push(score);
      }
    });

    return {
      strengths: strengths.sort((a, b) => b.score - a.score),
      weaknesses: weaknesses.sort((a, b) => a.score - b.score)
    };
  }

  private calculateLearningVelocity(profile: StudentProfile): number {
    // Simple calculation: lessons per week
    const daysSinceStart = 30; // Placeholder
    const weeksSinceStart = daysSinceStart / 7;

    return profile.completedLessons.length / weeksSinceStart;
  }

  private recommendFocusAreas(profile: StudentProfile): string[] {
    const recommendations: string[] = [];

    // Low mastery concepts
    const lowMastery = profile.conceptsMastered
      .filter(cm => cm.masteryLevel < 70)
      .map(cm => cm.concept);

    recommendations.push(...lowMastery);

    // Struggling concepts
    recommendations.push(...profile.strugglingConcepts);

    // Remove duplicates
    return Array.from(new Set(recommendations));
  }
}

interface TutorInteraction {
  type: 'question' | 'quiz' | 'code_review';
  lessonId: number;
  concept?: string;
  success?: boolean;
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Study plan: Goals, milestones, daily tasks, review schedule (spaced repetition), practice exercises, duration',
        'Gap analysis: Low mastery (<70%), missing target concepts, struggling concepts - sort by severity',
        'Spaced repetition: Review at 1 day, 7 days, 30 days, 90 days for optimal long-term retention',
        'Progress metrics: Overall progress (%), concept mastery (0-100), learning velocity (lessons/week), retention rate',
        'Analytics: Track interactions, identify trends, recommend focus areas, visualize progress over time'
      ]
    },
    {
      id: 307,
      title: 'Multi-Modal Learning & Socratic Method',
      content: `
        <h2>Multi-Modal Learning Support</h2>
        <p>Support different learning modalities (text, code, visual) to accommodate diverse learning preferences and reinforce concepts through multiple representations.</p>

        <h3>Learning Modalities</h3>
        <ul>
          <li><strong>Text:</strong> Written explanations, descriptions, documentation</li>
          <li><strong>Code:</strong> Working examples, snippets, complete implementations</li>
          <li><strong>Visual:</strong> Diagrams, flowcharts, mental models</li>
          <li><strong>Interactive:</strong> Hands-on exercises, playground code</li>
          <li><strong>Audio:</strong> Voice explanations (optional)</li>
          <li><strong>Video:</strong> Recorded lessons, tutorials (links)</li>
        </ul>

        <h3>Socratic Teaching Method</h3>
        <p>Guide students to discover solutions through questioning rather than direct answers:</p>

        <h4>Socratic Principles</h4>
        <ul>
          <li><strong>Ask, Don't Tell:</strong> Respond with guiding questions</li>
          <li><strong>Progressive Hints:</strong> Start broad, get more specific</li>
          <li><strong>Validate Reasoning:</strong> Confirm correct thinking</li>
          <li><strong>Redirect Gently:</strong> Guide back when off track</li>
          <li><strong>Encourage Discovery:</strong> Let student reach "aha!" moment</li>
        </ul>

        <h4>Question Progression</h4>
        <ol>
          <li><strong>First Response:</strong> "What do you know about this? What have you tried?"</li>
          <li><strong>Second Response:</strong> "What if you approached it this way? What concept might help?"</li>
          <li><strong>Third Response:</strong> "Consider how Observables handle async... What's similar?"</li>
          <li><strong>Fourth Response:</strong> "Here's the solution and why it works..."</li>
        </ol>

        <h3>Benefits of Socratic Method</h3>
        <ul>
          <li>Deeper understanding (not just memorization)</li>
          <li>Critical thinking skills development</li>
          <li>Independence (don't rely on AI for every answer)</li>
          <li>Better retention (discovered knowledge sticks)</li>
          <li>Confidence building</li>
        </ul>

        <h3>When to Use Each Approach</h3>
        <table>
          <tr>
            <th>Situation</th>
            <th>Approach</th>
            <th>Reason</th>
          </tr>
          <tr>
            <td>Conceptual question</td>
            <td>Socratic</td>
            <td>Guide to understanding</td>
          </tr>
          <tr>
            <td>Factual question</td>
            <td>Direct</td>
            <td>Simple lookup answer</td>
          </tr>
          <tr>
            <td>Debugging help</td>
            <td>Mixed</td>
            <td>Ask about code, then guide</td>
          </tr>
          <tr>
            <td>Complete confusion</td>
            <td>Direct</td>
            <td>Need foundation first</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 11,
          language: 'typescript',
          title: 'Multi-Modal Tutor Service',
          code: `// src/app/services/ai-tutor/multi-modal-tutor.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';

export interface ExplanationContent {
  textExplanation: string;
  codeExamples: CodeExample[];
  visualAid?: VisualAid;
  interactiveExercise?: Exercise;
  relatedResources: Resource[];
}

export interface VisualAid {
  type: 'mermaid' | 'ascii' | 'description';
  content: string;
  caption: string;
}

export interface Exercise {
  title: string;
  description: string;
  starterCode?: string;
  solution?: string;
  hints: string[];
}

export interface Resource {
  type: 'video' | 'article' | 'lesson';
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MultiModalTutor {
  constructor(private aiService: AIIntegrationService) {}

  /**
   * Generate multi-modal explanation
   */
  async generateExplanation(
    concept: string,
    format: 'text' | 'code' | 'diagram' | 'mixed' = 'mixed'
  ): Promise<ExplanationContent> {
    const prompt = this.buildMultiModalPrompt(concept, format);

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 1500
    });

    return this.parseExplanationContent(response.content, concept);
  }

  /**
   * Generate diagram for concept
   */
  async generateDiagram(concept: string, diagramType: string): Promise<string> {
    const prompt = [
      {
        role: 'system',
        content: \`You are a diagram generator. Create Mermaid diagrams for technical concepts.\`,
        copyable: true
      },
      {
        role: 'user',
        content: \`Generate a \${diagramType} diagram for "\${concept}" in Ionic/Angular. Return only the Mermaid code.\`
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.5,
      maxTokens: 500
    });

    return response.content;
  }

  /**
   * Generate interactive exercise
   */
  async generateExercise(concept: string, difficulty: string): Promise<Exercise> {
    const prompt = [
      {
        role: 'system',
        content: \`Generate a hands-on coding exercise for "\${concept}" at \${difficulty} difficulty.\`
      },
      {
        role: 'user',
        content: \`Create an exercise with starter code, solution, and progressive hints.\`
      }
    ];

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 800
    });

    return this.parseExercise(response.content);
  }

  private buildMultiModalPrompt(concept: string, format: string): Message[] {
    return [
      {
        role: 'system',
        content: \`You are a multi-modal tutor explaining "\${concept}".

PROVIDE:
1. Text Explanation (clear, concise)
2. Code Examples (TypeScript/Ionic)
3. Visual Aid (Mermaid diagram or ASCII art)
4. Interactive Exercise (hands-on task)
5. Related Resources (links to lessons)

FORMAT PREFERENCE: \${format}

Make it comprehensive and educational.\`
      },
      {
        role: 'user',
        content: \`Explain "\${concept}" using multiple modalities.\`
      }
    ];
  }

  private parseExplanationContent(content: string, concept: string): ExplanationContent {
    // Simplified parsing
    return {
      textExplanation: content,
      codeExamples: [],
      visualAid: undefined,
      interactiveExercise: undefined,
      relatedResources: []
    };
  }

  private parseExercise(content: string): Exercise {
    return {
      title: 'Practice Exercise',
      description: content,
      starterCode: '',
      solution: '',
      hints: []
    };
  }
}`,
          copyable: true
        },
        {
          id: 12,
          language: 'typescript',
          title: 'Socratic Tutor Service',
          code: `// src/app/services/ai-tutor/socratic-tutor.service.ts
import { Injectable } from '@angular/core';
import { AIIntegrationService } from '@app/services/ai/ai-integration.service';

export interface SocraticResponse {
  guidingQuestions: string[];
  hints: string[];
  encouragement: string;
  nextSteps: string[];
  shouldRevealAnswer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SocraticTutor {
  private questionCount = new Map<string, number>();

  constructor(private aiService: AIIntegrationService) {}

  /**
   * Respond using Socratic method
   */
  async respondSocratically(
    studentQuestion: string,
    context: LessonContext,
    conversationId: string
  ): Promise<SocraticResponse> {
    // Track question count for this conversation
    const count = (this.questionCount.get(conversationId) || 0) + 1;
    this.questionCount.set(conversationId, count);

    // Determine hint level based on question count
    const hintLevel = this.getHintLevel(count);

    const prompt = this.buildSocraticPrompt(
      studentQuestion,
      context,
      hintLevel
    );

    const response = await this.aiService.chat({
      messages: prompt,
      temperature: 0.7,
      maxTokens: 600
    });

    const socraticResponse = this.parseSocraticResponse(response.content);

    // After 4 attempts, reveal answer
    socraticResponse.shouldRevealAnswer = count >= 4;

    return socraticResponse;
  }

  /**
   * Reset conversation (start fresh)
   */
  resetConversation(conversationId: string): void {
    this.questionCount.delete(conversationId);
  }

  private getHintLevel(count: number): string {
    if (count === 1) return 'clarifying';
    if (count === 2) return 'guiding';
    if (count === 3) return 'hinting';
    return 'revealing';
  }

  private buildSocraticPrompt(
    question: string,
    context: LessonContext,
    hintLevel: string
  ): Message[] {
    const levelGuidance = {
      clarifying: 'Ask clarifying questions about what they know and have tried.',
      guiding: 'Ask guiding questions that point toward key concepts.',
      hinting: 'Provide more direct hints, but still ask questions.',
      revealing: 'Provide the answer with detailed explanation.'
    };

    return [
      {
        role: 'system',
        content: \`You are a Socratic tutor. Use the Socratic method to guide learning.

HINT LEVEL: \${hintLevel}
GUIDANCE: \${levelGuidance[hintLevel]}

PRINCIPLES:
- Ask thoughtful questions
- Build on student's knowledge
- Guide to discovery
- Be encouraging
- Don't give full answer unless revealing

Question to guide: \${question}\`,
        copyable: true
      },
      {
        role: 'user',
        content: question
      }
    ];
  }

  private parseSocraticResponse(content: string): SocraticResponse {
    // Extract questions (lines ending with ?)
    const guidingQuestions = content
      .split('\\n')
      .filter(line => line.trim().endsWith('?'))
      .map(line => line.trim());

    return {
      guidingQuestions,
      hints: [],
      encouragement: 'You\\'re on the right track! Keep thinking...',
      nextSteps: ['Try working through the guiding questions'],
      shouldRevealAnswer: false
    };
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Multi-modal benefits: Accommodates learning preferences, reinforces through multiple representations, improves retention',
        'Modalities: Text (explanations), code (examples), visual (diagrams), interactive (exercises), audio/video (optional)',
        'Socratic method: Ask guiding questions, progressive hints (1: clarify, 2: guide, 3: hint, 4: reveal)',
        'Benefits: Deeper understanding, critical thinking, independence, better retention, confidence building',
        'Balance: Use Socratic for concepts, direct for facts, mixed for debugging, direct when student is stuck'
      ]
    },
    {
      id: 308,
      title: 'Tutor Chat Interface & Demo',
      content: `
        <h2>Interactive Tutor Chat Interface</h2>
        <p>Build a complete chat interface for the AI tutor with code highlighting, quick actions, voice input, and lesson context display.</p>

        <h3>Chat Interface Features</h3>
        <ul>
          <li><strong>Message List:</strong> Display conversation history with role indicators</li>
          <li><strong>Code Highlighting:</strong> Syntax highlighting for code snippets</li>
          <li><strong>Markdown Rendering:</strong> Format text with markdown</li>
          <li><strong>Quick Actions:</strong> Explain, Example, Quiz, Help buttons</li>
          <li><strong>Voice Input:</strong> Speech-to-text for questions</li>
          <li><strong>Lesson Context:</strong> Show current lesson and topics</li>
          <li><strong>Loading States:</strong> Indicate when AI is thinking</li>
          <li><strong>Error Handling:</strong> Graceful failure messages</li>
        </ul>

        <h3>Code Highlighting</h3>
        <p>Use libraries for syntax highlighting:</p>
        <ul>
          <li><strong>Prism.js:</strong> Lightweight, extensible</li>
          <li><strong>Highlight.js:</strong> Auto-detection, many languages</li>
          <li><strong>Monaco Editor:</strong> Full editor (VS Code engine)</li>
        </ul>

        <h3>Quick Actions</h3>
        <table>
          <tr>
            <th>Action</th>
            <th>Description</th>
            <th>Prompt</th>
          </tr>
          <tr>
            <td>Explain</td>
            <td>Explain current concept</td>
            <td>"Explain [concept] in simple terms"</td>
          </tr>
          <tr>
            <td>Example</td>
            <td>Show code example</td>
            <td>"Show me a code example of [concept]"</td>
          </tr>
          <tr>
            <td>Quiz</td>
            <td>Generate quiz question</td>
            <td>"Quiz me on [lesson]"</td>
          </tr>
          <tr>
            <td>Help</td>
            <td>Show available commands</td>
            <td>Display help menu</td>
          </tr>
        </table>

        <h3>Voice Input</h3>
        <p>Use Web Speech API for voice recognition:</p>
        <ul>
          <li>Check browser support (Chrome, Edge)</li>
          <li>Request microphone permission</li>
          <li>Convert speech to text</li>
          <li>Send text to tutor</li>
          <li>Provide visual feedback (recording indicator)</li>
        </ul>

        <h3>Production Considerations</h3>
        <ul>
          <li><strong>Performance:</strong> Virtual scrolling for long conversations</li>
          <li><strong>Persistence:</strong> Save conversation to storage</li>
          <li><strong>Export:</strong> Download conversation as markdown/PDF</li>
          <li><strong>Privacy:</strong> Don't send sensitive data to AI</li>
          <li><strong>Cost:</strong> Limit message length, use cheaper models when possible</li>
          <li><strong>Accessibility:</strong> Keyboard navigation, screen reader support</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 13,
          language: 'typescript',
          title: 'AI Tutor Chat Component',
          code: `// src/app/components/ai-tutor-chat/ai-tutor-chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AITutorService } from '@app/services/ai-tutor/ai-tutor.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ai-tutor-chat',
  templateUrl: './ai-tutor-chat.component.html',
  styleUrls: ['./ai-tutor-chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AITutorChatComponent implements OnInit, OnDestroy {
  messages: TutorMessage[] = [];
  userInput = '';
  loading = false;
  currentLesson = 1;
  studentId = 'student_123';

  private destroy$ = new Subject<void>();
  private recognition?: any; // SpeechRecognition

  constructor(private tutorService: AITutorService) {}

  ngOnInit() {
    // Load conversation history
    this.tutorService.getConversationHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.scrollToBottom();
      });

    // Initialize voice recognition
    this.initVoiceRecognition();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Send message to tutor
   */
  async sendMessage() {
    if (!this.userInput.trim()) return;

    const question = this.userInput.trim();
    this.userInput = '';
    this.loading = true;

    try {
      const response = await this.tutorService.askQuestion(
        question,
        this.studentId
      );

      // Messages already added by service, just scroll
      this.scrollToBottom();
    } catch (error) {
      console.error('Error asking question:', error);
      this.showErrorMessage('Sorry, I encountered an error. Please try again.');
    } finally {
      this.loading = false;
    }
  }

  /**
   * Quick action: Explain concept
   */
  async explainConcept() {
    this.userInput = 'Can you explain the main concept from this lesson?';
    await this.sendMessage();
  }

  /**
   * Quick action: Show example
   */
  async showExample() {
    this.userInput = 'Can you show me a code example?';
    await this.sendMessage();
  }

  /**
   * Quick action: Generate quiz
   */
  async generateQuiz() {
    this.userInput = 'Quiz me on this lesson';
    await this.sendMessage();
  }

  /**
   * Start voice input
   */
  startVoiceInput() {
    if (!this.recognition) {
      alert('Voice input not supported in this browser');
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Voice recognition error:', error);
    }
  }

  /**
   * Clear conversation
   */
  clearConversation() {
    if (confirm('Clear conversation history?')) {
      this.tutorService.clearHistory();
    }
  }

  private initVoiceRecognition() {
    // Check for Web Speech API support
    const SpeechRecognition = (window as any).SpeechRecognition ||
                              (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log('Speech recognition not supported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userInput = transcript;
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  private scrollToBottom() {
    setTimeout(() => {
      const content = document.querySelector('ion-content');
      content?.scrollToBottom(300);
    }, 100);
  }

  private showErrorMessage(message: string) {
    this.messages.push({
      id: crypto.randomUUID(),
      role: 'tutor',
      content: message,
      timestamp: new Date()
    });
  }
}`,
          copyable: true
        },
        {
          id: 14,
          language: 'html',
          title: 'AI Tutor Chat Template',
          code: `<!-- src/app/components/ai-tutor-chat/ai-tutor-chat.component.html -->
<ion-header>
  <ion-toolbar>
    <ion-title>AI Learning Tutor</ion-title>
    <ion-chip slot="end" color="primary">
      <ion-icon name="book-outline"></ion-icon>
      <ion-label>Lesson {{ currentLesson }}</ion-label>
    </ion-chip>
    <ion-buttons slot="end">
      <ion-button (click)="clearConversation()">
        <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ai-tutor-content">
  <!-- Message List -->
  <div class="messages-container">
    <div
      *ngFor="let message of messages"
      class="message"
      [class.student-message]="message.role === 'student'"
      [class.tutor-message]="message.role === 'tutor'"
    >
      <div class="message-header">
        <ion-icon
          [name]="message.role === 'student' ? 'person-circle' : 'school'"
          class="avatar"
        ></ion-icon>
        <span class="role">{{ message.role === 'student' ? 'You' : 'Tutor' }}</span>
        <ion-note class="timestamp">{{ message.timestamp | date:'short' }}</ion-note>
      </div>

      <div class="message-content" [innerHTML]="message.content | markdown"></div>

      <!-- Code snippets if any -->
      <div *ngIf="message.codeSnippets?.length" class="code-snippets">
        <div *ngFor="let snippet of message.codeSnippets" class="code-snippet">
          <pre><code [class]="'language-' + snippet.language">{{ snippet.code }}</code></pre>
        </div>
      </div>

      <!-- Related concepts -->
      <div *ngIf="message.relatedConcepts?.length" class="related-concepts">
        <ion-chip *ngFor="let concept of message.relatedConcepts" size="small">
          {{ concept }}
        </ion-chip>
      </div>
    </div>

    <!-- Loading indicator -->
    <div *ngIf="loading" class="message tutor-message">
      <div class="message-header">
        <ion-icon name="school" class="avatar"></ion-icon>
        <span class="role">Tutor</span>
      </div>
      <div class="message-content">
        <ion-spinner name="dots"></ion-spinner>
        Thinking...
      </div>
    </div>
  </div>
</ion-content>

<ion-footer>
  <!-- Quick Actions -->
  <div class="quick-actions">
    <ion-button size="small" fill="clear" (click)="explainConcept()">
      <ion-icon name="bulb-outline" slot="start"></ion-icon>
      Explain
    </ion-button>
    <ion-button size="small" fill="clear" (click)="showExample()">
      <ion-icon name="code-outline" slot="start"></ion-icon>
      Example
    </ion-button>
    <ion-button size="small" fill="clear" (click)="generateQuiz()">
      <ion-icon name="help-circle-outline" slot="start"></ion-icon>
      Quiz Me
    </ion-button>
  </div>

  <!-- Input Area -->
  <ion-toolbar>
    <ion-textarea
      [(ngModel)]="userInput"
      placeholder="Ask a question about the lesson..."
      rows="2"
      autoGrow
      (keyup.enter)="!$event.shiftKey && sendMessage()"
    ></ion-textarea>

    <ion-buttons slot="end">
      <ion-button (click)="startVoiceInput()">
        <ion-icon name="mic-outline" slot="icon-only"></ion-icon>
      </ion-button>
      <ion-button (click)="sendMessage()" [disabled]="!userInput.trim() || loading">
        <ion-icon name="send" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>`,
          copyable: true
        },
        {
          id: 15,
          language: 'scss',
          title: 'AI Tutor Chat Styles',
          code: `// src/app/components/ai-tutor-chat/ai-tutor-chat.component.scss
.ai-tutor-content {
  --background: var(--ion-color-light);
}

.messages-container {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.message {
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease-in;

  .message-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    .avatar {
      font-size: 24px;
    }

    .role {
      font-weight: 600;
      font-size: 14px;
    }

    .timestamp {
      margin-left: auto;
      font-size: 12px;
    }
  }

  .message-content {
    padding: 12px 16px;
    border-radius: 12px;
    line-height: 1.6;

    // Markdown styles
    p {
      margin: 8px 0;
    }

    code {
      background: var(--ion-color-light);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    ul, ol {
      margin: 8px 0;
      padding-left: 24px;
    }
  }

  &.student-message {
    .message-content {
      background: var(--ion-color-primary);
      color: var(--ion-color-primary-contrast);
      margin-left: auto;
      max-width: 80%;
    }
  }

  &.tutor-message {
    .message-content {
      background: var(--ion-color-light-shade);
      color: var(--ion-color-dark);
      max-width: 90%;
    }
  }
}

.code-snippets {
  margin-top: 12px;

  .code-snippet {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 12px;
    overflow-x: auto;

    pre {
      margin: 0;

      code {
        color: #d4d4d4;
        font-size: 13px;
        line-height: 1.5;
      }
    }
  }
}

.related-concepts {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.quick-actions {
  display: flex;
  justify-content: space-around;
  padding: 8px 16px;
  border-bottom: 1px solid var(--ion-color-light-shade);
}

ion-footer {
  ion-toolbar {
    --padding-start: 8px;
    --padding-end: 8px;
  }

  ion-textarea {
    --padding-start: 12px;
    --padding-end: 12px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Chat interface: Message list, code highlighting, markdown rendering, quick actions, voice input, lesson context',
        'Code highlighting: Use Prism.js (lightweight), Highlight.js (auto-detect), or Monaco (full VS Code editor)',
        'Quick actions: Explain (simplify concept), Example (show code), Quiz (test knowledge), Help (commands)',
        'Voice input: Web Speech API (Chrome/Edge), check support, request permission, provide visual feedback',
        'Production: Virtual scrolling for performance, save conversations, export capability, privacy controls, cost limits'
      ]
    }
  ]
};
