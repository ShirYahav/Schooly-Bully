
class Config {

}

class DevelopmentConfig extends Config {
    public appUrl = "http://localhost:3001/"
    public userLoginUrl = "http://localhost:3001/api/auth/login/";
    public userRegisterUrl = "http://localhost:3001/api/auth/register/";
    public topRatedUsers = "http://localhost:3001/api/top-rated";
    public userImageUrl = "http://localhost:3001/api/users/images/";
    public userByIdUrl = "http://localhost:3001/api/users/";
    public subjectsUrl = "http://localhost:3001/api/subjects/";
    public booksBySubjectId ="http://localhost:3001/api/books-by-subject/";
    public bookById = "http://localhost:3001/api/book-by-id/";
    public questionByValues = "http://localhost:3001/api/questions-by-values/";
    public addQuestionUrl = "http://localhost:3001/api/questions/";
    public answerByQuestionIdUrl ="http://localhost:3001/api/answers-by-question/";
    public answerImageUrl = "http://localhost:3001/api/answers/images/";
    public addAnswerUrl = "http://localhost:3001/api/answers/";
    public deleteAnswerUrl = "http://localhost:3001/api/answers/";
    public questionsByUserIdUrl = "http://localhost:3001/api/questions-by-userId/";
    public answersByUserIdUrl = "http://localhost:3001/api/answers-by-userId/";
    public booksUrl = "http://localhost:3001/api/books/";
}

class ProductionConfig extends Config {
    public appUrl = "http://localhost:3001/"
    public userLoginUrl = "http://localhost:3001/api/auth/login/";
    public userRegisterUrl = "http://localhost:3001/api/auth/register/";
    public topRatedUsers = "http://localhost:3001/api/top-rated";
    public userImageUrl = "http://localhost:3001/api/users/images/";
    public userByIdUrl = "http://localhost:3001/api/users/";
    public subjectsUrl = "http://localhost:3001/api/subjects/";
    public booksBySubjectId ="http://localhost:3001/api/books-by-subject/";
    public bookById = "http://localhost:3001/api/book-by-id/";
    public questionByValues = "http://localhost:3001/api/questions-by-values/";
    public addQuestionUrl = "http://localhost:3001/api/questions/";
    public answerByQuestionIdUrl ="http://localhost:3001/api/answers-by-question/";
    public answerImageUrl = "http://localhost:3001/api/answers/images/";
    public addAnswerUrl = "http://localhost:3001/api/answers/";
    public deleteAnswerUrl = "http://localhost:3001/api/answers/";
    public questionsByUserIdUrl = "http://localhost:3001/api/questions-by-userId/";
    public answersByUserIdUrl = "http://localhost:3001/api/answers-by-userId/";
    public booksUrl = "http://localhost:3001/api/books/";
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;