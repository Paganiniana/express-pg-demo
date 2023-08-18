declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB_HOST: string;
        DB_NAME: string;
        DB_UNAME: string;
        DB_PASS: string;
        DB_TABLE_PERSONAL_INFO: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
  