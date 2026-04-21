export interface TrainingEnContent {
  slug: string;
  title?: string;
  description?: string;
  prerequisites?: string;
  targetAudience?: string[];
  benefits?: string[];
  program?: { title: string; items: string[] }[];
  faq?: { q: string; a: string }[];
  language?: string;
}

export const trainingsEn: TrainingEnContent[] = [
  {
    slug: 'microsoft-power-bi',
    description:
      'Microsoft Power BI training is the ideal starting point for teams wanting to enter the world of modern data analysis and dynamic reporting. Participants learn the complete Power BI workflow — from importing and transforming data, through building clear visualisations, to publishing reports accessible online and on mobile devices. The course prioritises hands-on practice, so participants create their own production-ready reports during the sessions.',
    prerequisites: 'Basic knowledge of MS Excel recommended',
    language: 'Polish or English',
    targetAudience: [
      'Teams working with Power BI Desktop looking to develop advanced data modelling and transformation skills',
      'Analysts who need effective tools for complex analysis and building comprehensive reports',
      'Managers seeking practical ways to quickly and intuitively analyse large volumes of data',
    ],
    benefits: [
      'Effective analysis from multiple data sources — integrate and clean data from different systems',
      'Modern visualisation design — aesthetic and clear dashboards',
      'Introduction to DAX — measures and calculated columns',
      'Report accessibility regardless of device — browser and mobile apps',
      'Publishing and sharing analyses via Power BI Service',
    ],
    program: [
      { title: 'Introduction to Power BI', items: ['What Power BI is and how it works', 'Key advantages of using the tool for data analysis'] },
      { title: 'Importing data from multiple sources', items: ['Loading data from Excel, CSV and text files', 'Connecting to folders and setting up automatic refreshes'] },
      { title: 'Working with data relationships', items: ['Automatic and manual relationship creation', 'Managing relationships — filter directions and cardinality', 'Organising and maintaining data models'] },
      { title: 'Cleaning and preparing data — Power Query', items: ['Overview of query editor features', 'Column and row transformations, changing data types', 'Merging and splitting data', 'Unpivot operation', 'Automatic consolidation of data from multiple sources'] },
      { title: 'Data analysis and the DAX language', items: ['Introduction to DAX — what it is and what it does', 'Creating calculations with key functions (CALCULATE, SUM, COUNT, DIVIDE)', 'Quick measures and custom calculated columns', 'Building measures that support visualisations', 'Creating a date calendar for time-based analysis'] },
      { title: 'Designing clear visualisations', items: ['Page view configuration — size, layout and proportions', 'Overview of available visuals and their use cases', 'Filtering at different levels (page, report, visual)', 'Interaction principles between visuals', 'Formatting and aligning objects'] },
      { title: 'Publishing and sharing reports', items: ['Exporting and publishing reports in Power BI Service', 'Sharing analyses with end users'] },
    ],
    faq: [
      { q: 'Who are Power BI trainings designed for?', a: 'I run trainings for analytical, finance, sales, controlling and data-working teams of all kinds. They suit teams just starting out with Power BI as well as those looking to consolidate and deepen existing knowledge.' },
      { q: 'Do I need to know DAX before the training?', a: 'No. DAX fundamentals are an integral part of the training. In advanced modules we cover complex formulas and optimisation — everything adapted to the current level of the participants.' },
      { q: 'Will I receive training materials?', a: 'Yes — every participant receives presentations, exercise sets and workshop files. After the training I share a curated list of resources for self-study.' },
    ],
  },
  {
    slug: 'microsoft-dax',
    description:
      'Microsoft DAX training introduces your team to the Data Analysis Expressions language — the essential tool for building advanced analytical models in Power BI. Participants develop the ability to create precise measures, calculated columns and complex expressions that extract significantly more value from data than standard visualisations alone.',
    prerequisites: 'Basic knowledge of MS Excel and Power BI',
    targetAudience: [
      'Analysts who need tools for building comprehensive reports and multidimensional analyses',
      'Teams working with Power BI Desktop developing advanced data modelling skills',
      'Managers looking for effective ways to interpret large datasets',
    ],
    benefits: [
      'Deep understanding of DAX mechanics and its role in data modelling',
      'Building independent time intelligence analyses with Time Intelligence functions',
      'Securing report data with Row Level Security (RLS)',
      'Parameterising calculations for dynamic analytical scenarios',
      'Best practices for writing readable, efficient DAX code',
    ],
    program: [
      { title: 'Table structure and relationship design', items: ['Creating dimension tables', 'Building a date table (CALENDAR, CALENDARAUTO, FORMAT)', 'Calculated columns and data types', 'Active and inactive relationships', 'Hierarchies and combining data from multiple sources'] },
      { title: 'Quick measures', items: ['Ready-made calculations and how to extend them', 'Turning quick measures into complex DAX expressions'] },
      { title: 'Most commonly used DAX functions', items: ['Aggregation functions: SUM, AVERAGE, MIN, MAX, RANKX', 'Counting: COUNT, COUNTA, DISTINCTCOUNT', 'Lookups: RELATED, LOOKUPVALUE', 'Exception handling: DIVIDE, BLANK, SELECTEDVALUE'] },
      { title: 'Changing data context', items: ['CALCULATE and FILTER functions', 'Controlling scope: ALL, ALLEXCEPT, ALLSELECTED'] },
      { title: 'Time Intelligence — time-based analysis', items: ['SAMEPERIODLASTYEAR, LASTMONTH', 'PARALLELPERIOD, DATESYTD, TOTALMTD', 'LASTNONBLANK — last known values'] },
      { title: 'Conditional logic and best practices', items: ['IF and SWITCH functions in measures', 'Variables and parameters in DAX', 'Commenting and structuring code', 'Optimising expression performance'] },
      { title: 'Data security (RLS)', items: ['Implementing Row Level Security', 'USERNAME and USERPRINCIPALNAME functions'] },
    ],
  },
  {
    slug: 'microsoft-power-query-powerbi',
    description:
      'Microsoft Power Query training is for teams that want to take full control of the data preparation process in Power BI. Participants explore the Power Query editor in depth — learning to automate data ingestion, clean data from sources ranging from Excel and SQL databases to PDF files, and combine data from multiple heterogeneous sources without manual intervention.',
    prerequisites: 'Basic knowledge of MS Excel and Power BI',
    targetAudience: [
      'Teams regularly working with Power BI who need tools for advanced data transformation',
      'Departments looking to automate data preparation from multiple heterogeneous sources',
      'Analysts working with incomplete or unstructured datasets',
      'Teams that want to eliminate manual data cleaning from Excel',
    ],
    benefits: [
      'Confident use of the Power Query editor and all its transformation tools',
      'Automating data loading and combining from Excel, CSV, databases and PDFs',
      'Effective data cleaning and standardisation — filling gaps, grouping and merging',
      'Combining and analysing data from local and cloud folders',
      'Understanding the M language and independently modifying queries',
    ],
    program: [
      { title: 'The role of Power Query in Power BI', items: ['Overview of the data modelling process', 'Identifying and analysing errors before editing', 'Reference tables, dimension tables and date calendars', 'Normalisation and denormalisation of datasets'] },
      { title: 'Data transformations', items: ['Splitting and merging columns', 'Unpivot and pivot operations', 'Transposing tables', 'Conditional and custom columns', 'Grouping and aggregation', 'Filling missing values', 'Working with dates and regional settings'] },
      { title: 'Importing from different sources', items: ['Text files: Excel, CSV, TXT', 'Relational databases', 'PDF files', 'Automatically combining files with the same structure', 'Consolidating files with different structures', 'Merging and splitting queries'] },
      { title: 'Query management', items: ['Loading, refreshing and disabling queries', 'Reference queries and duplicates', 'Grouping and organising the work environment'] },
      { title: 'Functions and parameterisation', items: ['Creating custom functions with variables', 'Parameters in queries', 'Repeatable transformations in a loop'] },
      { title: 'M language — advanced level', items: ['Syntax structure of the M language', 'Manual editing in the advanced editor', 'Key functions and unconventional solutions'] },
    ],
  },
  {
    slug: 'excel-poziom-podstawowy',
    title: 'MS Excel – Beginner Level',
    description:
      'MS Excel: Beginner Level is a solid foundation for teams that want to use Excel confidently in day-to-day work. Over two days, participants master worksheet management, basic formulas, data formatting and pivot tables — all through practical real-world examples.',
    prerequisites: 'None — beginner-friendly, starting from scratch',
    targetAudience: [
      'Employees starting with Excel or with only basic prior experience',
      'Teams that need spreadsheet skills for their daily responsibilities',
      'Employees preparing for intermediate or advanced level courses',
      'Teams wanting to work more efficiently and confidently with numerical data',
    ],
    benefits: [
      'Confident spreadsheet operation — from file structure to data management',
      'Practical knowledge of core formulas: SUM, AVERAGE, IF, VLOOKUP',
      'Creating clear tables and charts that present data professionally',
      'Preparing documents for print and export in a few simple steps',
      'A set of keyboard shortcuts that significantly speed up everyday work',
    ],
    program: [
      { title: 'Excel working environment', items: ['Interface and ribbon — key elements', 'Managing workbooks and worksheets', 'Navigating and selecting data', 'Essential keyboard shortcuts'] },
      { title: 'Entering and formatting data', items: ['Data types: numbers, text, dates', 'Formatting cells and ranges', 'Conditional formatting', 'Inserting images and shapes'] },
      { title: 'Basic formulas and functions', items: ['Mathematical operators and cell references', 'Functions: SUM, AVERAGE, MIN, MAX, COUNT', 'The IF function and simple conditional logic', 'VLOOKUP — the basics'] },
      { title: 'Working with tables and data', items: ['Sorting and filtering data', 'Excel Tables (Format as Table)', 'Finding and replacing data', 'Removing duplicates'] },
      { title: 'Pivot tables — introduction', items: ['Creating a simple pivot table', 'Grouping and filtering in a pivot table', 'Basic pivot charts'] },
      { title: 'Printing and export', items: ['Page setup and print area', 'Headers and footers', 'Exporting to PDF'] },
    ],
  },
  {
    slug: 'excel-poziom-srednio-zaawansowany',
    title: 'MS Excel – Intermediate Level',
    description:
      'MS Excel Intermediate training is for teams that already know the spreadsheet basics and want to significantly improve their efficiency. Participants master advanced lookup and logic functions, learn to create dynamic pivot tables and apply formula-based conditional formatting — skills that make a real difference in everyday analytical work.',
    prerequisites: 'Basic knowledge of MS Excel (beginner level or equivalent)',
    targetAudience: [
      'Employees who have completed beginner level or independently mastered Excel fundamentals',
      'Office and analytical teams regularly using spreadsheets',
      'Finance, sales and reporting departments wanting to increase productivity',
      'Employees preparing for advanced training or Power Query',
    ],
    benefits: [
      'Fluent use of XLOOKUP, INDEX and MATCH instead of outdated VLOOKUP',
      'Nesting logical functions — multi-condition analyses with IF, AND, OR and IFERROR',
      'Efficient text manipulation with LEFT, RIGHT, FIND, SUBSTITUTE and TEXTJOIN',
      'Advanced pivot tables with grouping, calculated fields and slicers',
      'Formula-based conditional formatting — dynamic data highlighting',
    ],
    program: [
      { title: 'Advanced lookup functions', items: ['VLOOKUP with approximate and exact match', 'XLOOKUP — the modern alternative to VLOOKUP', 'INDEX and MATCH — flexible two-way lookups', 'Error handling in lookup functions with IFERROR'] },
      { title: 'Conditional logic and function nesting', items: ['Complex IF formulas with multiple conditions', 'AND and OR as logical conditions', 'IFERROR and IFNA for exception handling', 'Nesting functions — building complex formulas step by step'] },
      { title: 'Text and date functions', items: ['Text extraction: LEFT, RIGHT, MID', 'Analysis and search: LEN, FIND, SEARCH', 'Replacing and joining: SUBSTITUTE, TRIM, TEXTJOIN', 'Date functions: YEAR, MONTH, DAY, WORKDAY, DATEDIF'] },
      { title: 'Advanced pivot tables', items: ['Grouping dates and numeric values', 'Calculated fields and items', 'Slicers and timelines as interactive filters', 'Pivot charts connected to the table', 'Refreshing data and automating updates'] },
      { title: 'Conditional formatting with formulas', items: ['Formula-based rules — dynamic row highlighting', 'Colour scales, data bars and icon sets', 'Formatting based on values from another cell', 'Managing and editing multiple rules at once'] },
      { title: 'Data validation and protection', items: ['Dropdown lists and data entry restrictions', 'Error messages and user hints', 'Protecting selected cells, worksheets and workbooks', 'Sharing a file with restricted editing access'] },
    ],
  },
  {
    slug: 'excel-poziom-zaawansowany',
    title: 'MS Excel – Advanced Level',
    description:
      'MS Excel Advanced training is for experienced Excel teams that want to fully leverage the capabilities of the modern spreadsheet. The programme covers dynamic and array functions from Excel 365, Power Query and Power Pivot tools, advanced scenario analyses and interactive dashboard creation — knowledge that genuinely raises the analytical competency of the whole department.',
    prerequisites: 'Good knowledge of MS Excel at intermediate level',
    targetAudience: [
      'Teams with intermediate Excel experience',
      'Analytical, controlling and BI departments working with large datasets',
      'Teams looking to build professional dashboards directly in Excel',
      'Employees planning to extend their skills to Power Query and Power Pivot',
    ],
    benefits: [
      'Fluent use of dynamic functions: FILTER, SORT, UNIQUE, SEQUENCE',
      'Automating data ingestion and transformation with Power Query — no coding required',
      'Building data models with relationships and DAX measures in Power Pivot',
      'Creating advanced dashboards with dynamic charts and slicers',
      'Running scenario analyses with Solver, data tables and Goal Seek',
    ],
    program: [
      { title: 'Dynamic and array functions (Excel 365)', items: ['FILTER — dynamically extracting data based on conditions', 'SORT and SORTBY — flexible result sorting', 'UNIQUE — list of values without duplicates', 'SEQUENCE — generating numeric series', 'Combining dynamic functions in advanced formulas'] },
      { title: 'Power Query in Excel', items: ['Importing data from files, folders and databases', 'Transformations: cleaning, merging, unpivoting columns', 'Automatically consolidating multiple files of the same structure', 'Refreshing queries and parameterising connections', 'Overview of the M language and advanced editor'] },
      { title: 'Power Pivot — data modelling', items: ['Building a model from multiple tables and relationships', 'Introduction to DAX: measures vs. calculated columns', 'Aggregation functions and CALCULATE in Power Pivot', 'Pivot tables based on the data model', 'KPIs and hierarchies in the Power Pivot model'] },
      { title: 'Advanced charts and dashboards', items: ['Combo charts and charts with two axes', 'Dynamic charts with controls and slicers', 'Single-sheet dashboards — layout, aesthetics and interaction', 'Sparklines (in-cell charts)', 'Exporting and presenting dashboards'] },
      { title: 'Scenario analysis and optimisation', items: ['Goal Seek — reverse target in formulas', 'Data tables — one- and two-variable sensitivity analysis', 'Scenario Manager — comparing decision alternatives', 'Solver — optimisation with constraints'] },
      { title: 'Recorded macros — automation', items: ['Recording a macro and analysing the generated VBA code', 'Running macros with buttons and keyboard shortcuts', 'Editing a recorded macro — simple modifications', 'Macro security and managing trusted files'] },
    ],
  },
  {
    slug: 'excel-vba',
    description:
      'MS Excel VBA training opens the door to genuine automation in spreadsheets. The team will learn Visual Basic for Applications from the first line of code — through variables, loops and conditional logic, to creating custom functions, user forms and responding to Excel events. After the training, repetitive tasks that used to take hours will be completed with a single click.',
    prerequisites: 'Good knowledge of MS Excel at advanced level',
    targetAudience: [
      'Advanced Excel users looking for tools to automate repetitive tasks',
      'Analytical and controlling departments wanting to create custom functions and reporting tools',
      'IT teams and data administrators working with Excel as an operational platform',
      'Employees interested in programming with no prior coding experience',
    ],
    benefits: [
      'Writing macros that automate everyday, repetitive Excel tasks independently',
      'Creating custom worksheet functions not available in standard Excel',
      'Building user forms for convenient data entry and processing',
      'Error handling and writing robust, fault-tolerant VBA code',
      'Responding to worksheet events — automatic actions when data changes',
    ],
    program: [
      { title: 'The VBA environment — first steps', items: ['Visual Basic Editor — windows, modules, properties', 'Recorded vs. hand-written macros — differences and capabilities', 'Running code: buttons, shortcuts, events', 'Debugging — step by step, breakpoints, Immediate window'] },
      { title: 'Variables, data types and operators', items: ['Declaring variables: Dim, As, Option Explicit', 'Data types: Integer, Long, Double, String, Boolean, Variant', 'Constants (Const) and public variables', 'Mathematical, comparison and logical operators'] },
      { title: 'Conditional logic', items: ['If...Then...Else and ElseIf statement', 'Select Case — a readable alternative to complex conditions', 'Nesting conditions and optimising code readability'] },
      { title: 'Loops — automating repetitive operations', items: ['For...Next — iterating over a numeric range', 'For Each...Next — loops over object collections', 'Do While / Do Until — conditional loops', 'Exiting loops: Exit For, Exit Do'] },
      { title: 'Working with Excel objects', items: ['Object model: Application, Workbook, Worksheet, Range', 'Cell references: Cells, Range, Offset', 'Worksheet operations: adding, deleting, copying', 'Working with multiple workbooks simultaneously'] },
      { title: 'User functions and error handling', items: ['Creating custom functions (Function) accessible in the worksheet', 'Sub vs. Function procedures — when to use which', 'On Error Resume Next, On Error GoTo — exception handling', 'Passing parameters to procedures and functions'] },
      { title: 'User forms and events', items: ['Creating a UserForm — text boxes, lists, buttons', 'Connecting the form to worksheet data', 'Worksheet events: Worksheet_Change, Worksheet_Activate', 'Workbook events: Workbook_Open, Workbook_BeforeSave'] },
    ],
  },
  {
    slug: 'excel-power-query',
    description:
      'MS Excel Power Query training is for teams that want to put an end to manual copy-and-paste in Excel once and for all. Participants learn to import, combine and transform data from different sources directly in Excel — without macros, without programming, without tedious manual operations. Power Query in Excel uses the same technology as Power BI, but is available natively within the spreadsheet.',
    prerequisites: 'Good knowledge of MS Excel (intermediate level or above)',
    targetAudience: [
      'Teams working with Excel at intermediate or advanced level',
      'Departments regularly consolidating reports from multiple files or systems into one spreadsheet',
      'Analytical teams looking to automate data preparation without VBA knowledge',
      'Finance, HR and sales departments processing data from ERP, CSV or external databases',
    ],
    benefits: [
      'Automatic data ingestion and refresh from files, folders, databases and websites',
      'Cleaning and transforming data without touching the original sources',
      'Combining multiple files from a folder into one consolidated report with a single click',
      'Merging and comparing data from different tables, just like in a database',
      'M language basics — editing queries and creating custom transformations',
    ],
    program: [
      { title: 'What Power Query is and why it matters', items: ['Power Query vs. manual copying — an efficiency comparison', 'The query editor interface in Excel', 'Step types and transformation history', 'Loading data to a table, model or connection only'] },
      { title: 'Importing data from different sources', items: ['Excel, CSV, TXT files — import and refresh', 'Folders — automatically combining multiple files', 'Databases (SQL Server, Access) — connection and query', 'Websites and JSON files — importing external data'] },
      { title: 'Data transformations and cleaning', items: ['Removing unnecessary rows and columns', 'Changing data types and regional settings', 'Splitting and merging text columns', 'Filling empty cells (Fill Down / Up)', 'Unpivot — converting columns to rows', 'Grouping and aggregating data'] },
      { title: 'Merging and appending queries', items: ['Merge (join) — the equivalent of a SQL JOIN', 'Append — combining tables of the same structure', 'Join types: left, right, inner, full outer', 'Handling schema mismatches when combining files'] },
      { title: 'Parameters and automation', items: ['Query parameters — dynamic paths and values', 'Data refresh — manual and automatic on file open', 'Reference queries and duplicates — organising your work', 'Exporting the query model to another file'] },
      { title: 'M language — advanced editor', items: ['Expression structure in the M language', 'Manually editing steps in the advanced editor', 'Creating custom functions', 'Key M functions: Text.*, Date.*, List.*, Table.*'] },
    ],
  },
  {
    slug: 'microsoft-sql-server',
    description:
      'Microsoft SQL Server training is a practical SQL query-writing course for analytical teams, BI specialists and departments that want to efficiently extract and analyse data from relational databases. Participants get to know the SQL Server Management Studio environment, master SELECT syntax from basics to subqueries and CTEs, learn to modify data and understand the fundamentals of query performance.',
    prerequisites: 'No technical requirements — suitable for teams with no prior SQL experience',
    targetAudience: [
      'Data analysts and BI specialists pulling data from databases for reports and dashboards',
      'Teams working with Power BI and Excel who want to write their own queries to SQL data sources',
      'Finance, sales and operations departments using data from ERP systems',
      'Teams with no SQL experience who want to learn it from scratch in a business context',
    ],
    benefits: [
      'Writing SELECT queries that retrieve exactly the data you need, independently',
      'Joining multiple tables with different JOIN types — as in professional data warehousing',
      'Aggregating and grouping data with GROUP BY, HAVING and window functions',
      'Creating readable, modular queries using CTEs (Common Table Expressions)',
      'Practical DML knowledge — safely inserting, updating and deleting data',
    ],
    program: [
      { title: 'Introduction to SQL Server and SSMS', items: ['Relational data model — tables, keys, relationships', 'SQL Server Management Studio — navigation and shortcuts', 'Connecting to a database and browsing its structure', 'SQL Server data types: numeric, text, dates, bit'] },
      { title: 'SELECT basics — retrieving data', items: ['SELECT ... FROM ... WHERE syntax', 'Filtering: comparison operators, BETWEEN, IN, LIKE, IS NULL', 'Sorting results: ORDER BY ASC/DESC', 'Column and table aliases — query readability', 'Eliminating duplicates: DISTINCT'] },
      { title: 'Aggregation and grouping', items: ['Aggregation functions: SUM, COUNT, AVG, MIN, MAX', 'Grouping data: GROUP BY', 'Filtering groups: HAVING vs. WHERE — when to use each', 'COUNT(*) vs. COUNT(column) — subtle differences'] },
      { title: 'Joining tables (JOIN)', items: ['INNER JOIN — matching records only', 'LEFT JOIN and RIGHT JOIN — preserving all records', 'FULL OUTER JOIN — union of sets', 'Joining multiple tables in a single query', 'Multi-condition joins and filtering after JOIN'] },
      { title: 'Subqueries and CTE expressions', items: ['Subqueries in WHERE, FROM and SELECT clauses', 'EXISTS and NOT EXISTS — checking for record existence', 'WITH ... AS — Common Table Expressions for readable queries', 'Recursive CTEs — hierarchies and tree structures (introduction)'] },
      { title: 'Built-in functions and DML', items: ['Text functions: LEN, UPPER, LOWER, TRIM, CONCAT, SUBSTRING', 'Date functions: GETDATE, YEAR, MONTH, DAY, DATEDIFF, DATEADD', 'Type conversion: CAST, CONVERT, TRY_CONVERT', 'INSERT INTO — inserting single and multiple rows', 'UPDATE ... SET ... WHERE — safe data modification', 'DELETE ... WHERE — conditional deletion'] },
      { title: 'Views, indexes and performance (introduction)', items: ['Views — encapsulating complex queries', 'Creating and modifying views', 'What indexes are and how they affect query speed', 'Reading a query execution plan — the basics'] },
    ],
  },
  {
    slug: 'excel-bi',
    description:
      "MS Excel BI training shows that Excel is capable of much more than a spreadsheet — it is a full Business Intelligence platform available without additional licences. The team will learn to combine Power Query, Power Pivot and advanced charts into a single cohesive ecosystem, building interactive analytical dashboards directly in Excel. Think of it as 'Power BI inside Excel' — no separate tool to deploy.",
    prerequisites: 'Good knowledge of MS Excel (advanced level or completed Power Query training)',
    targetAudience: [
      'Advanced Excel teams wanting to build professional analytical dashboards',
      'Analytical and controlling departments reporting to management without access to Power BI',
      'BI teams looking for a way to rapidly prototype reports in Excel',
      'Companies and departments wanting to implement BI without additional licensing costs',
    ],
    benefits: [
      'Full command of the data lifecycle: import (Power Query) → model (Power Pivot) → report',
      'Building relational data models from multiple tables without VLOOKUP',
      'Writing DAX measures in Power Pivot: calculations impossible with standard Excel formulas',
      'Interactive dashboards with slicers, timelines and dynamic charts',
      'Automatic data refresh — report up to date with a single click',
    ],
    program: [
      { title: 'Excel BI architecture — how it all fits together', items: ['Power Query, Power Pivot and pivot tables as one ecosystem', 'When Excel BI is enough and when you need Power BI', 'Enabling add-ins: Power Pivot and Power Query in different Excel versions', 'Designing a BI solution from query to dashboard'] },
      { title: 'Power Query — data preparation', items: ['Importing from files, folders and databases', 'Transformations: cleaning, data types, unpivot', 'Merging and appending tables', 'Parameterising connections and automatic refresh'] },
      { title: 'Power Pivot — data model and DAX', items: ['Loading data into the Power Pivot model', 'Creating relationships between tables — star schema', 'DAX measures: SUM, CALCULATE, DIVIDE, DISTINCTCOUNT', 'Date table and Time Intelligence functions', 'KPIs — visual indicators in Power Pivot'] },
      { title: 'Advanced pivot tables and pivot charts', items: ['Pivot tables based on the data model (not the worksheet)', 'Calculated fields and items vs. DAX measures', 'Pivot charts: combo, line, bar — matching to your data', 'Sparklines as a table complement'] },
      { title: 'Dashboards — design and interaction', items: ['Dashboard layout: information hierarchy and aesthetic principles', 'Slicers connected to multiple tables and charts', 'Timelines — filtering data by period', 'Dynamic titles and labels that respond to filters', 'Protecting the dashboard from accidental edits'] },
      { title: 'Automation and maintenance', items: ['Refreshing all queries with a single click', 'Managing connections and updating data sources', 'Documenting the model for other users', 'Best practices for naming and organising an Excel BI model'] },
    ],
  },
  {
    slug: 'powerpoint',
    description:
      'MS PowerPoint training is a visual communication course for teams that want their presentations to speak for themselves. Participants learn to design cohesive corporate templates, choose the right charts and layouts for specific data, use animations purposefully and build a slide narrative that leads the audience from question to answer. The result: presentations that look professional and genuinely persuade.',
    prerequisites: 'Basic knowledge of the Microsoft Office suite',
    targetAudience: [
      'Managers and specialists regularly presenting data and reports to management or clients',
      'Analysts transferring analysis results from Excel into PowerPoint presentations',
      'Teams creating training materials, sales offers and periodic reports',
      "Employees whose presentations are 'adequate' but want to make them truly compelling",
    ],
    benefits: [
      'A consistent, professional look in every presentation thanks to slide masters and themes',
      'Ability to choose the right chart type for specific data and the message it carries',
      'Creating a visual narrative — a presentation that guides the audience step by step',
      'Animations and transitions used purposefully, not decoratively — attention where it matters',
      'Significantly faster work through templates, shortcuts and the slide master technique',
    ],
    program: [
      { title: 'Principles of effective visual communication', items: ['Information hierarchy on a slide — what the viewer sees first', 'The one-idea-per-slide principle', 'Colour: contrast, consistency, psychology of colour', 'Typography in presentations — readability over creativity', 'What to avoid: bullet points, clipart, fonts that are too small'] },
      { title: 'Slide master and corporate templates', items: ['Slide master view — structure and layout inheritance', 'Creating a corporate template from scratch', 'Placing the logo, footer and numbering on all slides at once', 'Defining text styles and the colour theme', 'Exporting the template for reuse'] },
      { title: 'Charts and diagrams', items: ['Importing charts from Excel — live linking', 'Native PowerPoint charts — when better than Excel', 'SmartArt — process, hierarchy and cycle diagrams', 'Editing and formatting charts: labels, axes, series colours', 'Infographics from vector icons and shapes'] },
      { title: 'Animations and transitions', items: ['Slide transitions — which to use, which to avoid', 'Entrance, exit and emphasis animations', 'Animation timeline — synchronising multiple objects', 'Animating a bar chart bar by bar — narrative effect', 'Morph — smooth transition between slide states'] },
      { title: 'Narrative presentation and storytelling', items: ['Narrative structure: problem — analysis — solution', 'Title, transition and summary slides as rhythm elements', 'Techniques for engaging the audience during a presentation', 'Presenter mode: notes, preview, timer', 'Remote presentation — Teams, Zoom, screen sharing'] },
      { title: 'Export, video and shortcuts', items: ['Exporting to PDF while preserving graphic quality', 'Saving the presentation as a video with narration', 'Packaging a presentation with fonts and media', 'Most important PowerPoint keyboard shortcuts', 'PPTX vs. PPSX format — differences and uses'] },
    ],
  },
  {
    slug: 'excel-powerpoint-wizualizacja',
    title: 'MS Excel + PowerPoint – Data Visualisation',
    description:
      'MS Excel + PowerPoint — Data Visualisation is a complete course for teams that want to master the entire reporting value chain: from raw data in Excel to a polished, persuasive PowerPoint presentation. Participants learn chart selection principles, visual consistency between tools and techniques for creating management reports that are both analytically rigorous and aesthetically professional.',
    prerequisites: 'Good knowledge of MS Excel and basic knowledge of MS PowerPoint',
    targetAudience: [
      'Analysts and controllers regularly creating management reports or client presentations',
      'Finance, sales and operations specialists reporting results on weekly or monthly cycles',
      'Teams looking to shorten report production time from data to finished presentation',
      'Employees for whom visual consistency and professional materials are strategically important',
    ],
    benefits: [
      'Knowledge of data visualisation principles — the right chart for the right question',
      'Full pipeline: Excel data → dynamic charts → cohesive PowerPoint slides',
      'Time savings by live-linking Excel charts to PowerPoint',
      'Colour and typographic consistency between the spreadsheet and presentation',
      'A complete management report built from scratch during the training',
    ],
    program: [
      { title: 'Data visualisation principles', items: ['Choosing a chart for the analytical question: bar, line, pie, scatter', 'Information hierarchy and the minimum ink principle', 'Colour in visualisation: accent, background, diverging and sequential scales', 'Typography in charts — labels, titles, axes', 'Most common visualisation mistakes and how to avoid them'] },
      { title: 'Advanced charts in Excel', items: ['Combo charts — line and bar on one chart', 'Charts with two Y-axes', 'Dynamic charts with Excel tables and slicers', 'Waterfall and Gantt charts', 'Formatting data series, trend lines and labels'] },
      { title: 'Dynamically linking Excel to PowerPoint', items: ['Pasting a chart with a live link — one-click update', 'Pasting as image vs. OLE object — when to use which', 'Automatic chart update on data refresh', 'Managing connections and resolving link issues'] },
      { title: 'Consistent visual design of the report', items: ['Defining a colour palette consistent across Excel and PowerPoint', 'Slide master as the foundation of consistency', 'Exporting an Excel theme to PowerPoint', 'Chart styles and tables formatted to match the visual identity', 'Fonts, margins and grid as elements of professionalism'] },
      { title: 'Management report — a project from A to Z', items: ['Report structure: cover, KPIs, detailed analysis, summary', 'KPI slide — big numbers, trends, variances', 'Narrative slide — combining a chart with commentary', 'Comparison table with conditional formatting', 'Exporting the report to PDF and preparing for distribution'] },
      { title: 'Automation and maintaining the reporting cycle', items: ['Excel templates with a ready-made data structure', 'PowerPoint templates with reserved spaces for charts', 'Shortcuts and techniques for speeding up report updates', 'Documenting the reporting process for other team members'] },
    ],
  },
  {
    slug: 'excel-ai',
    title: 'MS Excel AI – Working with AI Tools',
    description:
      'MS Excel AI is an intensive two-day course for teams that want to genuinely accelerate their Excel work using artificial intelligence tools. Participants learn how to effectively use AI chatbots and assistants for generating formulas, cleaning data and automating repetitive tasks — without needing advanced technical knowledge. The programme combines practical AI applications with Excel automation fundamentals, so the impact is visible from day one.',
    prerequisites: 'Basic knowledge of MS Excel',
    language: 'Polish or English',
    targetAudience: [
      'Teams working with Excel at beginner or intermediate level',
      'Analytical and reporting departments looking for new tools to boost efficiency',
      'Office teams wanting to automate repetitive tasks',
      'Employees who have heard about AI but are unsure how to apply it practically at work',
      'Managers and coordinators working with spreadsheets daily',
    ],
    benefits: [
      'Effective use of ChatGPT and Microsoft Copilot in daily Excel work',
      'Independently generating and optimising formulas with AI support',
      'Automatically cleaning and standardising data without manual editing',
      'Creating a custom chatbot tailored to your spreadsheet structure',
      'Automation basics with macros and AI assistance',
      'Significantly less time spent on repetitive office tasks',
      'Skills ready to apply — immediately after the training',
    ],
    program: [
      { title: 'Introduction to AI in Excel work', items: ['What artificial intelligence is and how it changes analytical work', 'Overview of AI tools: ChatGPT, Microsoft Copilot and others', 'Best practices and security principles when using AI', 'How to write prompts to get the best results'] },
      { title: 'Generating and optimising formulas with AI', items: ['Creating formulas from natural language descriptions', 'Diagnosing and fixing formula errors with AI assistance', 'Optimising complex expressions — from VLOOKUP to XLOOKUP', 'Replacing manual calculations with automated AI solutions'] },
      { title: 'Data cleaning and transformation', items: ['Detecting and removing duplicates, errors and inconsistencies', 'Standardising date, number and text formats', 'Automatically filling gaps and normalising datasets', 'AI as an assistant in preparing data for reporting'] },
      { title: 'AI-assisted data analysis', items: ['Rapid data exploration with AI — natural language questions', 'Generating summaries and insights from spreadsheets', 'Building simple reports with AI suggestions', 'Interpreting results and validating chatbot responses'] },
      { title: 'Creating your own chatbot in Excel', items: ['The chatbot concept and its role in the spreadsheet environment', 'Defining context and instructions for the AI assistant', 'Customising the chatbot to your data structure and business needs', 'Testing and iteratively refining the solution'] },
      { title: 'Automation basics — macros and AI', items: ['What macros are and how they work in Excel', 'Recording your first macro and analysing its behaviour', 'Generating automation code with AI support', 'Running macros with buttons and keyboard shortcuts'] },
      { title: 'AI-driven automation — advanced applications', items: ['Creating procedures to automate multi-step tasks', 'Analysing and modifying ready-made solutions with AI', 'Combining formulas, data and automation in one process', 'Common pitfalls and how to avoid them when working with AI'] },
    ],
    faq: [
      { q: 'Do I need to know VBA before the training?', a: 'No. VBA fundamentals are an integral part of the training. We cover them step by step, and AI tools make them much easier to grasp.' },
      { q: 'Which AI tools does the training cover?', a: 'The training covers ChatGPT, Microsoft Copilot and other AI tools available in the Excel and data work ecosystem.' },
      { q: 'Will I receive training materials?', a: 'Yes — every participant receives presentations, exercise sets and workshop files. After the training I share a curated list of resources for self-study.' },
    ],
  },
];

export function getTrainingEnContent(slug: string): TrainingEnContent | undefined {
  return trainingsEn.find(t => t.slug === slug);
}
