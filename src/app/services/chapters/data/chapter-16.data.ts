// src/app/services/chapters/data/chapter-16.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_16_DATA: Chapter = {
  id: 16,
  title: 'Local Database - SQLite',
  description: 'Master SQLite for offline-first data persistence with migrations, transactions, and query optimization',
  icon: 'server-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 160,
      title: 'SQLite Fundamentals',
      content: `
        <h2>Understanding SQLite</h2>
        <p>SQLite is a self-contained, serverless, zero-configuration SQL database engine. It's the most widely deployed database in the world and perfect for mobile apps.</p>

        <h3>Why SQLite for Mobile?</h3>
        <h4>Advantages:</h4>
        <ul>
          <li><strong>Serverless:</strong> No separate database server process needed</li>
          <li><strong>Zero Configuration:</strong> Works out of the box, no setup required</li>
          <li><strong>Cross-Platform:</strong> Same database file works on iOS, Android, Web</li>
          <li><strong>ACID Compliant:</strong> Atomic, Consistent, Isolated, Durable transactions</li>
          <li><strong>Small Footprint:</strong> Lightweight library (~600KB)</li>
          <li><strong>Fast:</strong> Optimized for mobile device performance</li>
          <li><strong>Reliable:</strong> Battle-tested in billions of devices</li>
          <li><strong>SQL Standard:</strong> Use standard SQL queries</li>
          <li><strong>Transactional:</strong> Full transaction support with rollback</li>
        </ul>

        <h3>Storage Options Comparison</h3>
        <table>
          <tr>
            <th>Storage</th>
            <th>Type</th>
            <th>Platforms</th>
            <th>Max Size</th>
            <th>Best For</th>
          </tr>
          <tr>
            <td>SQLite</td>
            <td>SQL</td>
            <td>iOS, Android, Web</td>
            <td>Device storage (~GBs)</td>
            <td>Complex data, relationships, offline-first</td>
          </tr>
          <tr>
            <td>IndexedDB</td>
            <td>NoSQL</td>
            <td>Web only</td>
            <td>50MB-1GB (quota)</td>
            <td>Web-only apps, document storage</td>
          </tr>
          <tr>
            <td>Preferences</td>
            <td>Key-Value</td>
            <td>iOS, Android, Web</td>
            <td>Small (KB-MB)</td>
            <td>Simple settings, tokens, small data</td>
          </tr>
          <tr>
            <td>Filesystem</td>
            <td>Files</td>
            <td>iOS, Android, Web</td>
            <td>Device storage</td>
            <td>Binary files, media, large files</td>
          </tr>
        </table>

        <h3>When to Use Each Storage Type</h3>
        <ul>
          <li><strong>Capacitor Preferences:</strong> User settings (theme, language), auth tokens, simple flags</li>
          <li><strong>SQLite:</strong> Chapter progress data, bookmarks with relationships, user-generated content, offline-first features, &gt; 100 entries</li>
          <li><strong>Filesystem:</strong> Photos, audio, video, PDFs, documents, downloaded files, binary data</li>
          <li><strong>IndexedDB:</strong> Web-only when SQLite not needed, document-based data</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1600,
          language: 'typescript',
          title: 'Storage Options Comparison',
          copyable: true,
          code: `/*
💡 INTERVIEW: Mobile Storage Options Comparison

Q: When should you use SQLite vs IndexedDB vs Capacitor Preferences?
A:
- SQLite: Complex data, relationships, large datasets, offline-first apps
- IndexedDB: Web-only, NoSQL, good for documents and key-value
- Preferences: Simple key-value storage, app settings, small data

Q: Why not just use IndexedDB on all platforms?
A: IndexedDB:
   - Not available on native iOS/Android (only Web)
   - NoSQL means no SQL queries or relationships
   - Quota limits on web (can lose data)
   - SQLite is faster for structured data queries
*/

// Storage comparison
interface StorageOption {
  name: string;
  type: 'SQL' | 'NoSQL' | 'Key-Value';
  platforms: string[];
  maxSize: string;
  querySpeed: 'fast' | 'medium' | 'slow';
  relationships: boolean;
  transactions: boolean;
  bestFor: string;
}

const STORAGE_OPTIONS: StorageOption[] = [
  {
    name: 'SQLite',
    type: 'SQL',
    platforms: ['iOS', 'Android', 'Web'],
    maxSize: 'Device storage (~GBs)',
    querySpeed: 'fast',
    relationships: true,
    transactions: true,
    bestFor: 'Complex data, relationships, offline-first'
  },
  {
    name: 'IndexedDB',
    type: 'NoSQL',
    platforms: ['Web'],
    maxSize: '50MB-1GB (quota)',
    querySpeed: 'medium',
    relationships: false,
    transactions: true,
    bestFor: 'Web-only apps, document storage'
  },
  {
    name: 'Capacitor Preferences',
    type: 'Key-Value',
    platforms: ['iOS', 'Android', 'Web'],
    maxSize: 'Small (KB-MB)',
    querySpeed: 'fast',
    relationships: false,
    transactions: false,
    bestFor: 'Simple settings, tokens, small data'
  }
];`,
        },
        {
          id: 1601,
          language: 'typescript',
          title: 'Database Normalization Example',
          copyable: true,
          code: `/*
💡 INTERVIEW: Database Normalization

Q: What is database normalization?
A: Process of organizing data to reduce redundancy and improve integrity.

   1NF: Eliminate repeating groups, atomic values, unique rows
   2NF: Meet 1NF + no partial dependencies
   3NF: Meet 2NF + no transitive dependencies
*/

// ❌ BAD: Denormalized (redundant data)
interface BadChapterProgress {
  id: number;
  chapterTitle: string;        // Redundant!
  chapterDescription: string;  // Redundant!
  completed: boolean;
  completedAt: string;
}

// ✅ GOOD: Normalized (no redundancy)
interface Chapter {
  id: number;
  title: string;
  description: string;
}

interface ChapterProgress {
  id: number;
  chapterId: number;           // Foreign key
  completed: boolean;
  completedAt: string;
}`,
        },
      ],
    },
    {
      id: 161,
      title: 'Installing SQLite Plugin',
      content: `
        <h2>Capacitor SQLite Plugin</h2>
        <p>The @capacitor-community/sqlite plugin provides a unified API for SQLite database operations across all platforms.</p>

        <h3>Installation Steps</h3>
        <pre><code># Install SQLite plugin
npm install @capacitor-community/sqlite

# Sync native projects
npx cap sync

💡 INTERVIEW: Always run 'cap sync' after installing plugins!
   This updates native iOS/Android projects with new plugins.</code></pre>

        <h3>Why Use @capacitor-community/sqlite?</h3>
        <ul>
          <li>Unified API across iOS, Android, Web</li>
          <li>Promise-based TypeScript API</li>
          <li>Support for migrations</li>
          <li>Transaction support</li>
          <li>Encryption support (optional)</li>
          <li>Import/export functionality</li>
        </ul>

        <h3>Platform Support</h3>
        <table>
          <tr>
            <th>Platform</th>
            <th>Implementation</th>
            <th>Performance</th>
          </tr>
          <tr>
            <td>iOS</td>
            <td>Native SQLite</td>
            <td>Fast</td>
          </tr>
          <tr>
            <td>Android</td>
            <td>Native SQLite</td>
            <td>Fast</td>
          </tr>
          <tr>
            <td>Web</td>
            <td>SQL.js (WebAssembly)</td>
            <td>Good (slower than native)</td>
          </tr>
        </table>

        <h3>Database Location</h3>
        <ul>
          <li><strong>iOS:</strong> Library/LocalDatabase/ (backed up to iCloud)</li>
          <li><strong>Android:</strong> app's databases/ folder (app-private)</li>
          <li><strong>Web:</strong> IndexedDB (no file system)</li>
        </ul>

        <h3>Encryption Support</h3>
        <p>SQLite databases can be encrypted using SQLCipher integration:</p>
        <ul>
          <li>Transparent encryption at the file level</li>
          <li>Encryption key required to open database</li>
          <li>Performance impact: ~10-15% slower</li>
          <li>Essential for sensitive data (health, finance)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1610,
          language: 'bash',
          title: 'Installation Commands',
          copyable: true,
          code: `# Install SQLite plugin
npm install @capacitor-community/sqlite

# Install Capacitor dependencies
npm install @capacitor/core

# Sync native projects
npx cap sync

# Build for production
ionic build
npx cap copy
npx cap sync`,
        },
        {
          id: 1611,
          language: 'typescript',
          title: 'Capacitor Configuration',
          copyable: true,
          code: `// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ionicworkflow',
  appName: 'Ionic Workflow',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'default',  // Documents folder
      iosIsEncryption: false,          // Encryption disabled
      iosKeychainPrefix: 'ionic-workflow',
      androidIsEncryption: false,
    }
  }
};

export default config;`,
        },
      ],
    },
    {
      id: 162,
      title: 'Database Schema Design',
      content: `
        <h2>Designing the Database Schema</h2>
        <p>A well-designed schema is the foundation of a robust database application.</p>

        <h3>SQLite Data Types</h3>
        <p>SQLite has only 5 data types:</p>
        <ul>
          <li><strong>INTEGER:</strong> Whole numbers, booleans (0/1), dates (unix timestamp)</li>
          <li><strong>REAL:</strong> Floating point numbers</li>
          <li><strong>TEXT:</strong> Strings (UTF-8, UTF-16)</li>
          <li><strong>BLOB:</strong> Binary data (images, files)</li>
          <li><strong>NULL:</strong> Null value</li>
        </ul>

        <h3>Primary Keys</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Behavior</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>INTEGER PRIMARY KEY</td>
            <td>Auto-assigns unique values, can reuse deleted IDs</td>
            <td>Most tables (faster, less storage)</td>
          </tr>
          <tr>
            <td>AUTOINCREMENT</td>
            <td>Never reuses deleted IDs</td>
            <td>Only when ID reuse is a problem</td>
          </tr>
        </table>

        <h3>Foreign Keys</h3>
        <p>Foreign keys enforce referential integrity between tables:</p>
        <ul>
          <li><strong>ON DELETE CASCADE:</strong> When parent deleted, auto-delete children</li>
          <li><strong>ON UPDATE CASCADE:</strong> When parent ID changes, update children</li>
          <li><strong>Benefits:</strong> Prevent orphaned records, document relationships, database enforces consistency</li>
        </ul>

        <h3>Indexes</h3>
        <p>Indexes speed up queries by creating sorted lookups (B-tree structure):</p>
        <ul>
          <li>Create on primary keys (automatic)</li>
          <li>Create on foreign keys (for joins)</li>
          <li>Create on WHERE clause columns</li>
          <li>Create on ORDER BY columns</li>
          <li>Don't over-index (slows writes, uses storage)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1620,
          language: 'typescript',
          title: 'Database Schema Models',
          copyable: true,
          code: `// src/app/features/database/models/database-schema.model.ts

export interface ChapterEntity {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  completed: number;          // SQLite uses INTEGER for boolean (0/1)
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookmarkEntity {
  id: number;
  chapter_id: number;         // Foreign key
  section_id: number;
  title: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProgressEntity {
  id: number;
  date: string;               // YYYY-MM-DD
  minutes_spent: number;
  chapters_completed: number;
  streak_count: number;
  created_at: string;
}`,
        },
        {
          id: 1621,
          language: 'typescript',
          title: 'SQL Schema Definitions',
          copyable: true,
          code: `-- Chapters Table
CREATE TABLE IF NOT EXISTS chapters (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Bookmarks Table with Foreign Key
CREATE TABLE IF NOT EXISTS bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),

  FOREIGN KEY (chapter_id)
    REFERENCES chapters(id)
    ON DELETE CASCADE
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_bookmarks_chapter
  ON bookmarks(chapter_id);

CREATE INDEX IF NOT EXISTS idx_bookmarks_created
  ON bookmarks(created_at DESC);`,
        },
      ],
    },
    {
      id: 163,
      title: 'Database Service Implementation',
      content: `
        <h2>Building the Database Service</h2>
        <p>The DatabaseService wraps the SQLite plugin with a clean, type-safe API.</p>

        <h3>Service Architecture</h3>
        <ul>
          <li><strong>Connection Service:</strong> Manages database connection lifecycle</li>
          <li><strong>Database Service:</strong> Provides CRUD operations</li>
          <li><strong>Repository Pattern:</strong> Domain-specific data access</li>
          <li><strong>Transaction Service:</strong> Handles multi-statement transactions</li>
        </ul>

        <h3>Why Wrap SQLite Plugin in a Service?</h3>
        <ol>
          <li><strong>Abstraction:</strong> Hide plugin implementation details</li>
          <li><strong>Type Safety:</strong> TypeScript interfaces for queries</li>
          <li><strong>Error Handling:</strong> Centralized error management</li>
          <li><strong>Testing:</strong> Easy to mock for unit tests</li>
          <li><strong>RxJS Integration:</strong> Observables for async operations</li>
        </ol>

        <h3>SQL Injection Prevention</h3>
        <p>Always use parameterized queries to prevent SQL injection attacks:</p>
        <table>
          <tr>
            <th>Type</th>
            <th>Example</th>
            <th>Security</th>
          </tr>
          <tr>
            <td>❌ UNSAFE</td>
            <td>\`WHERE id = \${id}\`</td>
            <td>Vulnerable to injection</td>
          </tr>
          <tr>
            <td>✅ SAFE</td>
            <td>WHERE id = ? with params: [id]</td>
            <td>Automatically escaped</td>
          </tr>
        </table>

        <h3>CRUD Operations</h3>
        <ul>
          <li><strong>Create:</strong> INSERT with returning ID</li>
          <li><strong>Read:</strong> SELECT with type safety</li>
          <li><strong>Update:</strong> UPDATE with affected rows count</li>
          <li><strong>Delete:</strong> DELETE with affected rows count</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1630,
          language: 'typescript',
          title: 'Database Connection Service',
          copyable: true,
          code: `// src/app/core/services/database/database-connection.service.ts

import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {
  private sqliteConnection!: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private isInitialized = false;

  private readonly DB_NAME = 'ionic_workflow.db';
  private readonly DB_VERSION = 3;

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    // Create SQLite connection
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);

    // For web, initialize SQL.js
    if (Capacitor.getPlatform() === 'web') {
      await this.initializeWebSQLite();
    }

    // Open database
    this.db = await this.sqliteConnection.createConnection(
      this.DB_NAME,
      false,  // Encryption disabled
      'no-encryption',
      this.DB_VERSION,
      false
    );

    await this.db.open();

    // Enable foreign keys (disabled by default)
    await this.db.execute('PRAGMA foreign_keys = ON;');

    this.isInitialized = true;
  }

  private async initializeWebSQLite(): Promise<void> {
    const jeepSqlite = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepSqlite);
    await customElements.whenDefined('jeep-sqlite');
    await this.sqliteConnection.initWebStore();
  }

  getConnection(): SQLiteDBConnection {
    if (!this.isInitialized) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.isInitialized = false;
    }
  }
}`,
        },
        {
          id: 1631,
          language: 'typescript',
          title: 'Database Service with CRUD',
          copyable: true,
          code: `// src/app/core/services/database/database.service.ts

import { Injectable } from '@angular/core';
import { DatabaseConnectionService } from './database-connection.service';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private dbConnection: DatabaseConnectionService) {}

  execute(sql: string, params: any[] = []): Observable<any> {
    return from(this._execute(sql, params)).pipe(
      catchError((error) => this.handleError('Execute failed', error))
    );
  }

  private async _execute(sql: string, params: any[]): Promise<any> {
    const db = this.dbConnection.getConnection();
    const result = await db.run(sql, params);
    return result;
  }

  query<T = any>(sql: string, params: any[] = []): Observable<T[]> {
    return from(this._query<T>(sql, params)).pipe(
      catchError((error) => this.handleError('Query failed', error))
    );
  }

  private async _query<T>(sql: string, params: any[]): Promise<T[]> {
    const db = this.dbConnection.getConnection();
    const result = await db.query(sql, params);
    return result.values as T[];
  }

  insert(table: string, data: Record<string, any>): Observable<number> {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const sql = \`INSERT INTO \${table} (\${columns}) VALUES (\${placeholders})\`;

    return this.execute(sql, values).pipe(
      map((result) => result.changes.lastId)
    );
  }

  update(
    table: string,
    data: Record<string, any>,
    where: string,
    whereParams: any[] = []
  ): Observable<number> {
    const setClause = Object.keys(data).map(key => \`\${key} = ?\`).join(', ');
    const values = [...Object.values(data), ...whereParams];
    const sql = \`UPDATE \${table} SET \${setClause} WHERE \${where}\`;

    return this.execute(sql, values).pipe(
      map((result) => result.changes.changes)
    );
  }

  delete(table: string, where: string, whereParams: any[] = []): Observable<number> {
    const sql = \`DELETE FROM \${table} WHERE \${where}\`;
    return this.execute(sql, whereParams).pipe(
      map((result) => result.changes.changes)
    );
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);

    let userMessage = message;

    if (error.message?.includes('UNIQUE constraint')) {
      userMessage = 'Duplicate entry. This record already exists.';
    } else if (error.message?.includes('FOREIGN KEY constraint')) {
      userMessage = 'Cannot delete. Other records depend on this.';
    }

    return throwError(() => new Error(userMessage));
  }
}`,
        },
      ],
    },
    {
      id: 164,
      title: 'Database Migrations',
      content: `
        <h2>Version-Controlled Schema Changes</h2>
        <p>Migrations allow you to evolve your database schema over time without losing user data.</p>

        <h3>Why Migrations?</h3>
        <ul>
          <li><strong>Preserve Data:</strong> Don't lose user's bookmarks, progress, etc.</li>
          <li><strong>Version Control:</strong> Track history of schema changes</li>
          <li><strong>Rollback Support:</strong> Undo changes if needed (optional)</li>
          <li><strong>Team Collaboration:</strong> Everyone stays in sync</li>
        </ul>

        <h3>Migration Strategy</h3>
        <ol>
          <li>Store current database version</li>
          <li>Check version on app startup</li>
          <li>Run missing migrations in order</li>
          <li>Update version number</li>
        </ol>

        <h3>Migration Patterns</h3>
        <table>
          <tr>
            <th>Change</th>
            <th>Pattern</th>
            <th>Complexity</th>
          </tr>
          <tr>
            <td>Add column</td>
            <td>ALTER TABLE ... ADD COLUMN</td>
            <td>Simple (safe)</td>
          </tr>
          <tr>
            <td>Remove column</td>
            <td>Keep column, mark deprecated</td>
            <td>Simple (safe)</td>
          </tr>
          <tr>
            <td>Rename column</td>
            <td>Add new, copy data, remove old</td>
            <td>Complex</td>
          </tr>
          <tr>
            <td>Change type</td>
            <td>Add new column, migrate data</td>
            <td>Complex</td>
          </tr>
        </table>

        <h3>Transaction-Based Migrations</h3>
        <p>Always run migrations inside transactions:</p>
        <ul>
          <li>Start transaction</li>
          <li>Run all SQL statements</li>
          <li>If error: rollback entire migration</li>
          <li>If success: commit and update version</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1640,
          language: 'typescript',
          title: 'Migration Interface',
          copyable: true,
          code: `// src/app/core/services/database/migrations/migration.interface.ts

export interface Migration {
  version: number;
  name: string;
  up: string[];    // SQL to apply migration
  down?: string[]; // SQL to rollback (optional)
}

export const MIGRATIONS: Migration[] = [];

export function RegisterMigration(migration: Migration) {
  MIGRATIONS.push(migration);
  MIGRATIONS.sort((a, b) => a.version - b.version);
}`,
        },
        {
          id: 1641,
          language: 'typescript',
          title: 'Migration Runner Service',
          copyable: true,
          code: `// src/app/core/services/database/migrations/migration-runner.service.ts

import { Injectable } from '@angular/core';
import { DatabaseConnectionService } from '../database-connection.service';
import { MIGRATIONS } from './migration.interface';

@Injectable({
  providedIn: 'root'
})
export class MigrationRunnerService {

  constructor(private dbConnection: DatabaseConnectionService) {}

  async runMigrations(): Promise<void> {
    const db = this.dbConnection.getConnection();

    // Create migrations table
    await db.execute(\`
      CREATE TABLE IF NOT EXISTS migrations (
        version INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    \`);

    // Get current version
    const currentVersion = await this.getCurrentVersion();

    // Find pending migrations
    const pendingMigrations = MIGRATIONS.filter(
      m => m.version > currentVersion
    );

    if (pendingMigrations.length === 0) {
      console.log('Database is up to date');
      return;
    }

    // Run each migration in transaction
    for (const migration of pendingMigrations) {
      await this.runMigration(migration);
    }
  }

  private async runMigration(migration: Migration): Promise<void> {
    const db = this.dbConnection.getConnection();

    try {
      await db.execute('BEGIN TRANSACTION;');

      // Execute all UP statements
      for (const sql of migration.up) {
        await db.execute(sql);
      }

      // Record migration
      await db.execute(
        'INSERT INTO migrations (version, name) VALUES (?, ?)',
        [migration.version, migration.name]
      );

      await db.execute('COMMIT;');

    } catch (error) {
      await db.execute('ROLLBACK;');
      throw new Error(\`Migration \${migration.version} failed: \${error}\`);
    }
  }

  private async getCurrentVersion(): Promise<number> {
    const db = this.dbConnection.getConnection();

    try {
      const result = await db.query(
        'SELECT MAX(version) as version FROM migrations'
      );
      return result.values?.[0]?.version || 0;
    } catch {
      return 0;
    }
  }
}`,
        },
        {
          id: 1642,
          language: 'typescript',
          title: 'Example Migration Files',
          copyable: true,
          code: `// src/app/core/services/database/migrations/001_initial.ts

import { Migration, RegisterMigration } from './migration.interface';

const initialMigration: Migration = {
  version: 1,
  name: 'initial_schema',
  up: [
    \`CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      category TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      completed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )\`,

    \`CREATE INDEX IF NOT EXISTS idx_chapters_completed
      ON chapters(completed, completed_at)\`
  ],
  down: [
    'DROP INDEX IF EXISTS idx_chapters_completed',
    'DROP TABLE IF EXISTS chapters'
  ]
};

RegisterMigration(initialMigration);`,
        },
      ],
    },
    {
      id: 165,
      title: 'Repository Pattern & Queries',
      content: `
        <h2>Repository Pattern for Data Access</h2>
        <p>The Repository pattern provides a clean abstraction over database operations.</p>

        <h3>Why Repository Pattern?</h3>
        <ol>
          <li><strong>Separation of Concerns:</strong> Business logic vs data access</li>
          <li><strong>Testability:</strong> Mock repositories in tests</li>
          <li><strong>Centralized Queries:</strong> DRY principle</li>
          <li><strong>Type Safety:</strong> TypeScript interfaces</li>
          <li><strong>Reusable Logic:</strong> Common operations in base class</li>
        </ol>

        <h3>Repository vs Service</h3>
        <table>
          <tr>
            <th>Layer</th>
            <th>Responsibility</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Repository</td>
            <td>Data access only (CRUD)</td>
            <td>findById(), create(), update()</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>Business logic</td>
            <td>createBookmarkWithValidation()</td>
          </tr>
        </table>

        <h3>SQL Query Optimization</h3>
        <ul>
          <li><strong>Use EXPLAIN QUERY PLAN:</strong> Analyze query performance</li>
          <li><strong>Create Indexes:</strong> On frequently queried columns</li>
          <li><strong>Avoid SELECT *:</strong> Only fetch needed columns</li>
          <li><strong>Use JOINs:</strong> Avoid N+1 query problems</li>
          <li><strong>Batch Operations:</strong> Use transactions</li>
        </ul>

        <h3>SQL JOIN Operations</h3>
        <p><strong>INNER JOIN:</strong> Returns rows where there's a match in BOTH tables</p>
        <p><strong>LEFT JOIN:</strong> All rows from left table, matched from right (or NULL)</p>

        <h3>LIKE Operator for Text Search</h3>
        <ul>
          <li><strong>%</strong> = any characters (zero or more)</li>
          <li><strong>_</strong> = single character</li>
          <li>'abc%' = starts with 'abc'</li>
          <li>'%xyz' = ends with 'xyz'</li>
          <li>'%search%' = contains 'search'</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1650,
          language: 'typescript',
          title: 'Base Repository Class',
          copyable: true,
          code: `// src/app/features/database/repositories/base-repository.ts

import { DatabaseService } from '@app/core/services/database/database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseRepository<T> {

  constructor(
    protected db: DatabaseService,
    protected tableName: string
  ) {}

  findAll(orderBy: string = 'id ASC'): Observable<T[]> {
    return this.db.findAll<T>(this.tableName, orderBy);
  }

  findById(id: number): Observable<T | null> {
    return this.db.findById<T>(this.tableName, id);
  }

  create(entity: Omit<T, 'id'>): Observable<T> {
    const data = this.toDatabase(entity);
    return this.db.insert(this.tableName, data).pipe(
      map((id) => ({ ...entity, id } as T))
    );
  }

  update(id: number, entity: Partial<T>): Observable<T> {
    const data = this.toDatabase(entity);
    return this.db.update(this.tableName, data, 'id = ?', [id]).pipe(
      map(() => ({ ...entity, id } as T))
    );
  }

  delete(id: number): Observable<void> {
    return this.db.delete(this.tableName, 'id = ?', [id]).pipe(
      map(() => undefined)
    );
  }

  count(where: string = '1=1', params: any[] = []): Observable<number> {
    return this.db.count(this.tableName, where, params);
  }

  protected toDatabase(entity: Partial<T>): Record<string, any> {
    // Convert camelCase to snake_case
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(entity)) {
      const dbKey = key.replace(/[A-Z]/g, l => \`_\${l.toLowerCase()}\`);
      result[dbKey] = value;
    }
    return result;
  }
}`,
        },
        {
          id: 1651,
          language: 'typescript',
          title: 'Chapters Repository',
          copyable: true,
          code: `// src/app/features/database/repositories/chapters.repository.ts

import { Injectable } from '@angular/core';
import { BaseRepository } from './base-repository';
import { ChapterEntity } from '../models/database-schema.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChaptersRepository extends BaseRepository<ChapterEntity> {

  constructor(db: DatabaseService) {
    super(db, 'chapters');
  }

  findCompleted(): Observable<ChapterEntity[]> {
    return this.db.query<ChapterEntity>(
      'SELECT * FROM chapters WHERE completed = 1 ORDER BY completed_at DESC'
    );
  }

  findByCategory(category: string): Observable<ChapterEntity[]> {
    return this.db.query<ChapterEntity>(
      'SELECT * FROM chapters WHERE category = ? ORDER BY id ASC',
      [category]
    );
  }

  markCompleted(id: number): Observable<void> {
    return this.db.execute(
      \`UPDATE chapters
       SET completed = 1,
           completed_at = datetime('now')
       WHERE id = ?\`,
      [id]
    ).pipe(map(() => undefined));
  }

  getCompletionStats(): Observable<{
    total: number;
    completed: number;
    percentage: number;
  }> {
    return this.db.query<{ total: number; completed: number }>(
      \`SELECT COUNT(*) as total, SUM(completed) as completed
       FROM chapters\`
    ).pipe(
      map((rows) => {
        const stats = rows[0];
        return {
          total: stats.total,
          completed: stats.completed || 0,
          percentage: stats.total > 0
            ? (stats.completed / stats.total) * 100
            : 0
        };
      })
    );
  }

  search(query: string): Observable<ChapterEntity[]> {
    return this.db.query<ChapterEntity>(
      \`SELECT * FROM chapters
       WHERE title LIKE ? OR description LIKE ?
       ORDER BY id ASC\`,
      [\`%\${query}%\`, \`%\${query}%\`]
    );
  }
}`,
        },
      ],
    },
    {
      id: 166,
      title: 'Transactions & Performance',
      content: `
        <h2>ACID Transactions</h2>
        <p>Transactions ensure data integrity with ACID properties: Atomic, Consistent, Isolated, Durable.</p>

        <h3>ACID Properties Explained</h3>
        <table>
          <tr>
            <th>Property</th>
            <th>Meaning</th>
            <th>Benefit</th>
          </tr>
          <tr>
            <td>Atomic</td>
            <td>All-or-nothing execution</td>
            <td>Either all changes succeed or none</td>
          </tr>
          <tr>
            <td>Consistent</td>
            <td>Valid state to valid state</td>
            <td>Constraints enforced (NOT NULL, FOREIGN KEY)</td>
          </tr>
          <tr>
            <td>Isolated</td>
            <td>Concurrent transactions don't interfere</td>
            <td>Lock-based concurrency control</td>
          </tr>
          <tr>
            <td>Durable</td>
            <td>Committed changes persist</td>
            <td>Survives crashes with Write-ahead logging</td>
          </tr>
        </table>

        <h3>Transaction Performance</h3>
        <p>Transactions dramatically improve bulk operation performance:</p>
        <ul>
          <li><strong>Without Transaction (1000 inserts):</strong> 1000 individual transactions, ~500ms-2s</li>
          <li><strong>With Transaction:</strong> 1 transaction, ~10ms-50ms</li>
          <li><strong>Speedup:</strong> Up to 100x faster!</li>
        </ul>

        <h3>When to Use Transactions</h3>
        <ul>
          <li>Multiple related changes</li>
          <li>Need all-or-nothing guarantee</li>
          <li>Migrating data between tables</li>
          <li>Batch operations (inserts, updates, deletes)</li>
          <li>Ensuring data consistency</li>
        </ul>

        <h3>Query Optimization Techniques</h3>
        <ol>
          <li><strong>Use EXPLAIN QUERY PLAN:</strong> Identify slow queries</li>
          <li><strong>Look for "SCAN TABLE":</strong> Bad (full table scan)</li>
          <li><strong>Look for "SEARCH TABLE USING INDEX":</strong> Good (uses index)</li>
          <li><strong>Create Indexes:</strong> On WHERE, ORDER BY columns</li>
          <li><strong>Avoid SELECT *:</strong> Only fetch needed columns</li>
          <li><strong>Fix N+1 Queries:</strong> Use JOINs instead of loops</li>
        </ol>

        <h3>Performance Best Practices</h3>
        <ul>
          <li>Batch inserts in transactions (100x faster)</li>
          <li>Create indexes on foreign keys</li>
          <li>Use prepared statements (query caching)</li>
          <li>Limit result sets with LIMIT clause</li>
          <li>Use connection pooling (keep connection open)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1660,
          language: 'typescript',
          title: 'Transaction Service',
          copyable: true,
          code: `// src/app/core/services/database/transaction.service.ts

import { Injectable } from '@angular/core';
import { DatabaseConnectionService } from './database-connection.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private dbConnection: DatabaseConnectionService) {}

  execute<T>(operations: () => Promise<T>): Observable<T> {
    return from(this._execute(operations));
  }

  private async _execute<T>(operations: () => Promise<T>): Promise<T> {
    const db = this.dbConnection.getConnection();

    try {
      await db.execute('BEGIN TRANSACTION;');
      const result = await operations();
      await db.execute('COMMIT;');
      return result;
    } catch (error) {
      await db.execute('ROLLBACK;');
      throw error;
    }
  }

  executeBatch(sql: string, values: any[][]): Observable<void> {
    return from(this._executeBatch(sql, values));
  }

  private async _executeBatch(sql: string, values: any[][]): Promise<void> {
    const db = this.dbConnection.getConnection();

    try {
      await db.execute('BEGIN TRANSACTION;');

      for (const params of values) {
        await db.run(sql, params);
      }

      await db.execute('COMMIT;');
    } catch (error) {
      await db.execute('ROLLBACK;');
      throw error;
    }
  }
}`,
        },
        {
          id: 1661,
          language: 'typescript',
          title: 'Batch Insert Performance',
          copyable: true,
          code: `// Example: Batch Insert with Transaction

@Injectable({ providedIn: 'root' })
export class ChapterSyncService {

  constructor(
    private db: DatabaseService,
    private transaction: TransactionService
  ) {}

  // ❌ SLOW: Individual inserts (no transaction)
  async importChaptersSlow(chapters: any[]): Promise<void> {
    for (const chapter of chapters) {
      await this.db.insert('chapters', chapter).toPromise();
    }
    // Takes: ~2 seconds for 100 chapters
  }

  // ✅ FAST: All inserts in one transaction
  importChaptersFast(chapters: any[]): Observable<void> {
    return this.transaction.execute(async () => {
      for (const chapter of chapters) {
        await this.db.insert('chapters', chapter).toPromise();
      }
    });
    // Takes: ~50ms for 100 chapters
  }

  // ✅ FASTEST: Prepared statement reused
  importChaptersFastest(chapters: any[]): Observable<void> {
    const sql = \`
      INSERT INTO chapters (id, title, description, icon, category)
      VALUES (?, ?, ?, ?, ?)
    \`;

    const values = chapters.map(c => [
      c.id, c.title, c.description, c.icon, c.category
    ]);

    return this.transaction.executeBatch(sql, values);
    // Takes: ~20ms for 100 chapters
  }
}`,
        },
      ],
    },
    {
      id: 167,
      title: 'Integration with NgRx',
      content: `
        <h2>Offline-First with NgRx Sync</h2>
        <p>Integrate SQLite database with NgRx store for seamless offline-first experience.</p>

        <h3>Offline-First Architecture</h3>
        <ol>
          <li>Save data locally (SQLite) by default</li>
          <li>Sync with server when online</li>
          <li>User never sees "No internet" errors</li>
          <li>Data always available instantly</li>
        </ol>

        <h3>Two-Way Sync Strategy</h3>
        <table>
          <tr>
            <th>Direction</th>
            <th>Trigger</th>
            <th>Purpose</th>
          </tr>
          <tr>
            <td>Database → NgRx</td>
            <td>App startup</td>
            <td>Load persisted data into state</td>
          </tr>
          <tr>
            <td>NgRx → Database</td>
            <td>User actions</td>
            <td>Persist changes locally</td>
          </tr>
          <tr>
            <td>Database ↔ Server</td>
            <td>When online</td>
            <td>Sync with cloud</td>
          </tr>
        </table>

        <h3>Conflict Resolution</h3>
        <p>What happens if database and server conflict?</p>
        <ul>
          <li><strong>Last Write Wins:</strong> Simple, can lose data</li>
          <li><strong>Server Always Wins:</strong> Simple, loses local changes</li>
          <li><strong>Merge Changes:</strong> Complex, preserves both</li>
          <li><strong>Prompt User:</strong> Best UX, more code</li>
        </ul>

        <h3>Sync Patterns</h3>
        <ul>
          <li><strong>Batch Changes:</strong> Don't sync on every change</li>
          <li><strong>Sync Periodically:</strong> Every 5 minutes</li>
          <li><strong>Sync on Foreground:</strong> When app becomes active</li>
          <li><strong>Sync on WiFi:</strong> Save mobile data</li>
          <li><strong>Background Sync:</strong> Use service workers</li>
        </ul>

        <h3>App Initialization Order</h3>
        <ol>
          <li>Create database connection</li>
          <li>Run migrations (schema updates)</li>
          <li>Load data into NgRx store</li>
          <li>Start sync service (if online)</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 1670,
          language: 'typescript',
          title: 'Database Sync Service',
          copyable: true,
          code: `// src/app/features/database/services/database-sync.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChaptersRepository } from '../repositories/chapters.repository';
import { BookmarksRepository } from '../repositories/bookmarks.repository';
import { ChaptersActions } from '@app/store/chapters/chapters.actions';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSyncService {

  constructor(
    private store: Store,
    private chaptersRepo: ChaptersRepository,
    private bookmarksRepo: BookmarksRepository
  ) {}

  /**
   * Initialize: Load data from database into NgRx store
   * Call this at app startup
   */
  initialize(): Observable<void> {
    return combineLatest([
      this.chaptersRepo.findAll(),
      this.bookmarksRepo.findAll()
    ]).pipe(
      tap(([chapters, bookmarks]) => {
        // Load into store
        this.store.dispatch(ChaptersActions.loadChaptersSuccess({
          chapters
        }));

        this.store.dispatch(BookmarksActions.loadBookmarksSuccess({
          bookmarks
        }));

        console.log('Database synced to store:', {
          chapters: chapters.length,
          bookmarks: bookmarks.length
        });
      }),
      map(() => undefined)
    );
  }

  saveChapterCompletion(chapterId: number, completed: boolean): Observable<void> {
    if (completed) {
      return this.chaptersRepo.markCompleted(chapterId);
    } else {
      return this.chaptersRepo.markIncomplete(chapterId);
    }
  }

  saveBookmark(bookmark: Omit<BookmarkEntity, 'id'>): Observable<BookmarkEntity> {
    return this.bookmarksRepo.create(bookmark);
  }

  deleteBookmark(id: number): Observable<void> {
    return this.bookmarksRepo.delete(id);
  }
}`,
        },
        {
          id: 1671,
          language: 'typescript',
          title: 'App Initialization',
          copyable: true,
          code: `// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { DatabaseConnectionService } from '@app/core/services/database/database-connection.service';
import { MigrationRunnerService } from '@app/core/services/database/migrations/migration-runner.service';
import { DatabaseSyncService } from '@app/features/database/services/database-sync.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: \`
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  \`
})
export class AppComponent implements OnInit {

  constructor(
    private dbConnection: DatabaseConnectionService,
    private migrations: MigrationRunnerService,
    private dbSync: DatabaseSyncService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Initializing database...'
    });
    await loading.present();

    try {
      // 1. Initialize connection
      await this.dbConnection.initialize();
      console.log('✅ Database connection initialized');

      // 2. Run migrations
      await this.migrations.runMigrations();
      console.log('✅ Migrations completed');

      // 3. Load data into store
      await this.dbSync.initialize().toPromise();
      console.log('✅ Database synced to store');

      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      console.error('❌ Database initialization failed:', error);
      this.showDatabaseError(error);
    }
  }
}`,
        },
      ],
    },
  ],
};
