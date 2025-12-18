import { Question, Genre } from '@/types/game';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create a question with shuffled answers
function createQuestion(
  id: string,
  question: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  category: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Question {
  const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);
  return {
    id,
    question,
    correctAnswer,
    incorrectAnswers,
    allAnswers,
    category,
    difficulty,
  };
}

export const EIGHTIES_MUSIC_QUESTIONS: Question[] = [
  createQuestion('80s-1', "Which artist released 'Thriller' in 1982?", 'Michael Jackson', ['Prince', 'Madonna', 'Whitney Houston'], "80's Music", 'easy'),
  createQuestion('80s-2', "What was Madonna's first #1 hit?", 'Like a Virgin', ['Material Girl', 'Papa Don\'t Preach', 'Holiday'], "80's Music"),
  createQuestion('80s-3', "Which band sang 'Take On Me'?", 'a-ha', ['Duran Duran', 'Tears for Fears', 'Depeche Mode'], "80's Music"),
  createQuestion('80s-4', "Who performed 'Purple Rain'?", 'Prince', ['Michael Jackson', 'George Michael', 'Lionel Richie'], "80's Music", 'easy'),
  createQuestion('80s-5', "Which song starts with 'Just a small town girl'?", "Don't Stop Believin'", ['Livin\' on a Prayer', 'Eye of the Tiger', 'We Built This City'], "80's Music"),
  createQuestion('80s-6', "What band is Bon Jovi the lead singer of?", 'Bon Jovi', ['Def Leppard', 'Poison', 'Mötley Crüe'], "80's Music", 'easy'),
  createQuestion('80s-7', "Who sang 'Girls Just Want to Have Fun'?", 'Cyndi Lauper', ['Madonna', 'Pat Benatar', 'Debbie Harry'], "80's Music"),
  createQuestion('80s-8', "Which British band sang 'Every Breath You Take'?", 'The Police', ['U2', 'Duran Duran', 'The Cure'], "80's Music"),
  createQuestion('80s-9', "What year was 'Billie Jean' released?", '1983', ['1982', '1984', '1985'], "80's Music"),
  createQuestion('80s-10', "Who sang 'Sweet Child O' Mine'?", "Guns N' Roses", ['Aerosmith', 'Van Halen', 'Bon Jovi'], "80's Music"),
  createQuestion('80s-11', "Which artist had a hit with 'I Wanna Dance with Somebody'?", 'Whitney Houston', ['Janet Jackson', 'Madonna', 'Tina Turner'], "80's Music"),
  createQuestion('80s-12', "What was the best-selling album of the 1980s?", 'Thriller', ['Back in Black', 'Purple Rain', 'Born in the U.S.A.'], "80's Music"),
  createQuestion('80s-13', "Who sang 'Wake Me Up Before You Go-Go'?", 'Wham!', ['Culture Club', 'Duran Duran', 'Spandau Ballet'], "80's Music"),
  createQuestion('80s-14', "Which artist released 'Like a Prayer' in 1989?", 'Madonna', ['Janet Jackson', 'Whitney Houston', 'Cyndi Lauper'], "80's Music"),
  createQuestion('80s-15', "What band performed 'Hungry Like the Wolf'?", 'Duran Duran', ['a-ha', 'The Police', 'INXS'], "80's Music"),
  createQuestion('80s-16', "Who had a hit with 'Beat It'?", 'Michael Jackson', ['Prince', 'Van Halen', 'Def Leppard'], "80's Music", 'easy'),
  createQuestion('80s-17', "Which song features the lyrics 'Here I am, rock you like a hurricane'?", 'Rock You Like a Hurricane', ['Pour Some Sugar on Me', 'Photograph', 'Jump'], "80's Music"),
  createQuestion('80s-18', "Who performed 'Karma Chameleon'?", 'Culture Club', ['Wham!', 'Duran Duran', 'Frankie Goes to Hollywood'], "80's Music"),
  createQuestion('80s-19', "What year did Live Aid take place?", '1985', ['1984', '1986', '1987'], "80's Music"),
  createQuestion('80s-20', "Who sang 'Total Eclipse of the Heart'?", 'Bonnie Tyler', ['Heart', 'Pat Benatar', 'Stevie Nicks'], "80's Music"),
  createQuestion('80s-21', "Which band released 'Pour Some Sugar on Me'?", 'Def Leppard', ['Bon Jovi', 'Poison', 'Whitesnake'], "80's Music"),
  createQuestion('80s-22', "Who performed 'Footloose'?", 'Kenny Loggins', ['Huey Lewis', 'Phil Collins', 'Rick Springfield'], "80's Music"),
  createQuestion('80s-23', "What was Tina Turner's comeback hit in 1984?", "What's Love Got to Do with It", ['Private Dancer', 'Better Be Good to Me', 'We Don\'t Need Another Hero'], "80's Music"),
  createQuestion('80s-24', "Which artist sang 'Faith'?", 'George Michael', ['Prince', 'Rick Astley', 'Phil Collins'], "80's Music"),
  createQuestion('80s-25', "Who had the hit 'Jump'?", 'Van Halen', ['Bon Jovi', 'Def Leppard', 'Scorpions'], "80's Music"),
];

export const TV_SHOWS_QUESTIONS: Question[] = [
  createQuestion('tv-1', "What coffee shop do the Friends hang out at?", 'Central Perk', ['Java Joe\'s', 'The Coffee House', 'Cafe Mocha'], "90's/2000's TV", 'easy'),
  createQuestion('tv-2', "What is the name of the paper company in The Office?", 'Dunder Mifflin', ['Staples', 'Paper Plus', 'Scott\'s Tots Paper Co.'], "90's/2000's TV", 'easy'),
  createQuestion('tv-3', "What is Kramer's first name on Seinfeld?", 'Cosmo', ['George', 'Jerry', 'Newman'], "90's/2000's TV"),
  createQuestion('tv-4', "Which show features the phrase 'How you doin'?'", 'Friends', ['Seinfeld', 'Frasier', 'Will & Grace'], "90's/2000's TV", 'easy'),
  createQuestion('tv-5', "What city is Frasier set in?", 'Seattle', ['Boston', 'San Francisco', 'Chicago'], "90's/2000's TV"),
  createQuestion('tv-6', "What was Rachel's job at the end of Friends?", 'Fashion Executive at Louis Vuitton', ['Waitress', 'Buyer at Bloomingdale\'s', 'Personal Shopper'], "90's/2000's TV"),
  createQuestion('tv-7', "Who is Michael Scott's arch-nemesis at the other branch?", 'Toby Flenderson', ['Todd Packer', 'Jan Levinson', 'Charles Miner'], "90's/2000's TV"),
  createQuestion('tv-8', "What is the name of Jerry Seinfeld's neighbor across the hall?", 'Newman', ['Kramer', 'George', 'Frank'], "90's/2000's TV"),
  createQuestion('tv-9', "In The Office, what does 'WUPHF' stand for?", 'Nothing - it\'s just the sound a dog makes', ['Washington Universal Phone Hub Framework', 'Web Universal Phone Friend', 'Wireless Universal Phone Hub'], "90's/2000's TV", 'hard'),
  createQuestion('tv-10', "Who played Carrie Bradshaw in Sex and the City?", 'Sarah Jessica Parker', ['Kim Cattrall', 'Kristin Davis', 'Cynthia Nixon'], "90's/2000's TV"),
  createQuestion('tv-11', "What was the name of the bar in How I Met Your Mother?", "MacLaren's Pub", ['The Pub', 'Puzzles', 'Paddy\'s Pub'], "90's/2000's TV"),
  createQuestion('tv-12', "Which character says 'That\'s what she said' frequently?", 'Michael Scott', ['Dwight Schrute', 'Jim Halpert', 'Kevin Malone'], "90's/2000's TV", 'easy'),
  createQuestion('tv-13', "What is Chandler Bing's job?", 'Statistical Analysis and Data Reconfiguration', ['Accountant', 'Marketing', 'IT Consultant'], "90's/2000's TV", 'hard'),
  createQuestion('tv-14', "In Seinfeld, what is 'The Contest' about?", 'Who can go longest without masturbating', ['A cooking contest', 'A dance competition', 'A trivia game'], "90's/2000's TV"),
  createQuestion('tv-15', "Which TV show introduced us to Springfield?", 'The Simpsons', ['Family Guy', 'South Park', 'King of the Hill'], "90's/2000's TV", 'easy'),
  createQuestion('tv-16', "What does Phoebe's most famous song describe?", 'A Smelly Cat', ['A Silly Dog', 'A Crazy Bird', 'A Lazy Mouse'], "90's/2000's TV"),
  createQuestion('tv-17', "What is the name of Dwight's farm?", 'Schrute Farms', ['Schrute Beets', 'Dwight\'s Den', 'The Beet Farm'], "90's/2000's TV"),
  createQuestion('tv-18', "In Friends, what was the name of Ross's monkey?", 'Marcel', ['Charlie', 'George', 'Clyde'], "90's/2000's TV"),
  createQuestion('tv-19', "What show features the catchphrase 'Yada yada yada'?", 'Seinfeld', ['Friends', 'Frasier', 'Cheers'], "90's/2000's TV"),
  createQuestion('tv-20', "Who was the 'Soup Nazi' on Seinfeld?", 'A strict soup vendor', ['Jerry\'s enemy', 'George\'s boss', 'Kramer\'s friend'], "90's/2000's TV"),
  createQuestion('tv-21', "What instrument does Ross play (badly)?", 'Keyboard', ['Guitar', 'Drums', 'Saxophone'], "90's/2000's TV"),
  createQuestion('tv-22', "What is the name of the documentary crew filming The Office?", 'PBS Documentary Crew', ['NBC News', 'Discovery Channel', 'BBC Films'], "90's/2000's TV"),
  createQuestion('tv-23', "How many seasons did Friends run?", '10', ['8', '9', '12'], "90's/2000's TV"),
  createQuestion('tv-24', "What city is Will & Grace set in?", 'New York City', ['Los Angeles', 'Chicago', 'San Francisco'], "90's/2000's TV"),
  createQuestion('tv-25', "Who is Jim's love interest in The Office?", 'Pam Beesly', ['Angela Martin', 'Kelly Kapoor', 'Karen Filippelli'], "90's/2000's TV", 'easy'),
];

export const CLASSIC_MOVIES_QUESTIONS: Question[] = [
  createQuestion('classic-1', "In what movie does Humphrey Bogart say 'Here\'s looking at you, kid'?", 'Casablanca', ['The Maltese Falcon', 'The Big Sleep', 'Key Largo'], 'Classic Movies', 'easy'),
  createQuestion('classic-2', "Who directed 'Citizen Kane'?", 'Orson Welles', ['Alfred Hitchcock', 'John Ford', 'Billy Wilder'], 'Classic Movies'),
  createQuestion('classic-3', "What is the name of the mansion in 'Gone with the Wind'?", 'Tara', ['Twelve Oaks', 'Manderley', 'Xanadu'], 'Classic Movies'),
  createQuestion('classic-4', "Who played Dorothy in 'The Wizard of Oz'?", 'Judy Garland', ['Shirley Temple', 'Deanna Durbin', 'Mickey Rooney'], 'Classic Movies', 'easy'),
  createQuestion('classic-5', "What was Rosebud in 'Citizen Kane'?", 'A sled', ['A woman', 'A horse', 'A painting'], 'Classic Movies'),
  createQuestion('classic-6', "Who starred in 'Some Like It Hot' with Tony Curtis and Jack Lemmon?", 'Marilyn Monroe', ['Audrey Hepburn', 'Grace Kelly', 'Elizabeth Taylor'], 'Classic Movies'),
  createQuestion('classic-7', "What Alfred Hitchcock film features the Bates Motel?", 'Psycho', ['Vertigo', 'The Birds', 'Rear Window'], 'Classic Movies'),
  createQuestion('classic-8', "Who played Scarlett O'Hara in 'Gone with the Wind'?", 'Vivien Leigh', ['Bette Davis', 'Katharine Hepburn', 'Joan Crawford'], 'Classic Movies'),
  createQuestion('classic-9', "In 'Singin\' in the Rain', what new technology threatens Hollywood?", 'Talking pictures (talkies)', ['Television', 'Color film', 'Wide screen'], 'Classic Movies'),
  createQuestion('classic-10', "Who directed 'It\'s a Wonderful Life'?", 'Frank Capra', ['John Ford', 'Howard Hawks', 'William Wyler'], 'Classic Movies'),
  createQuestion('classic-11', "What year was 'Casablanca' released?", '1942', ['1940', '1944', '1946'], 'Classic Movies'),
  createQuestion('classic-12', "Who played the title role in 'Rebecca'?", 'No one - Rebecca never appears', ['Joan Fontaine', 'Laurence Olivier', 'Judith Anderson'], 'Classic Movies', 'hard'),
  createQuestion('classic-13', "What classic film features the line 'Frankly, my dear, I don\'t give a damn'?", 'Gone with the Wind', ['Casablanca', 'The Maltese Falcon', 'Citizen Kane'], 'Classic Movies', 'easy'),
  createQuestion('classic-14', "Who was known as 'The King of Hollywood'?", 'Clark Gable', ['Cary Grant', 'James Stewart', 'Gary Cooper'], 'Classic Movies'),
  createQuestion('classic-15', "What 1939 film features the line 'There\'s no place like home'?", 'The Wizard of Oz', ['Gone with the Wind', 'Mr. Smith Goes to Washington', 'Stagecoach'], 'Classic Movies', 'easy'),
  createQuestion('classic-16', "Who starred opposite Katharine Hepburn in 'The African Queen'?", 'Humphrey Bogart', ['Spencer Tracy', 'Cary Grant', 'James Stewart'], 'Classic Movies'),
  createQuestion('classic-17', "What film won the first Academy Award for Best Picture?", 'Wings', ['The Jazz Singer', 'Sunrise', 'Seventh Heaven'], 'Classic Movies', 'hard'),
  createQuestion('classic-18', "Who directed 'Rear Window' and 'Vertigo'?", 'Alfred Hitchcock', ['Billy Wilder', 'John Huston', 'Otto Preminger'], 'Classic Movies'),
  createQuestion('classic-19', "In 'Sunset Boulevard', what is Norma Desmond's profession?", 'Silent film actress', ['Opera singer', 'Stage actress', 'Dancer'], 'Classic Movies'),
  createQuestion('classic-20', "Who played the lead in 'Roman Holiday' (1953)?", 'Audrey Hepburn', ['Grace Kelly', 'Elizabeth Taylor', 'Ingrid Bergman'], 'Classic Movies'),
  createQuestion('classic-21', "What classic film features the song 'As Time Goes By'?", 'Casablanca', ['An American in Paris', 'Singin\' in the Rain', 'The Band Wagon'], 'Classic Movies'),
  createQuestion('classic-22', "Who was Fred Astaire's most famous dance partner?", 'Ginger Rogers', ['Cyd Charisse', 'Rita Hayworth', 'Eleanor Powell'], 'Classic Movies'),
  createQuestion('classic-23', "What is the name of the reporter in 'Citizen Kane'?", 'Thompson', ['Kane', 'Bernstein', 'Leland'], 'Classic Movies', 'hard'),
  createQuestion('classic-24', "Who directed 'The Maltese Falcon' (1941)?", 'John Huston', ['Howard Hawks', 'William Wyler', 'Michael Curtiz'], 'Classic Movies'),
  createQuestion('classic-25', "What year was 'Gone with the Wind' released?", '1939', ['1937', '1941', '1943'], 'Classic Movies'),
];

export const HOLIDAY_MOVIES_QUESTIONS: Question[] = [
  createQuestion('holiday-1', "What do the kids want for Christmas in 'Jingle All the Way'?", 'Turbo Man action figure', ['Power Ranger', 'Tickle Me Elmo', 'Buzz Lightyear'], 'Holiday Movies'),
  createQuestion('holiday-2', "In 'Home Alone', where are the McCallisters going on vacation?", 'Paris', ['London', 'Hawaii', 'Florida'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-3', "What is the name of the main character in 'Elf'?", 'Buddy', ['Jack', 'Santa Jr.', 'Jingle'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-4', "In 'A Christmas Story', what does Ralphie want for Christmas?", 'Red Ryder BB Gun', ['Football', 'Sled', 'Bicycle'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-5', "What town is 'It\'s a Wonderful Life' set in?", 'Bedford Falls', ['Springfield', 'Pleasantville', 'Smallville'], 'Holiday Movies'),
  createQuestion('holiday-6', "Who plays the Grinch in the 2000 live-action film?", 'Jim Carrey', ['Mike Myers', 'Robin Williams', 'Eddie Murphy'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-7', "In 'Die Hard', what building does the action take place in?", 'Nakatomi Plaza', ['Trump Tower', 'Empire State Building', 'Willis Tower'], 'Holiday Movies'),
  createQuestion('holiday-8', "What is the name of the angel in 'It\'s a Wonderful Life'?", 'Clarence', ['Gabriel', 'Michael', 'Raphael'], 'Holiday Movies'),
  createQuestion('holiday-9', "In 'The Santa Clause', what happens when Scott Calvin puts on the suit?", 'He becomes Santa', ['He gets superpowers', 'He shrinks', 'He can fly'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-10', "What Christmas movie features the song 'White Christmas'?", 'White Christmas', ['Holiday Inn', 'It\'s a Wonderful Life', 'Miracle on 34th Street'], 'Holiday Movies'),
  createQuestion('holiday-11', "In 'Home Alone 2', where does Kevin end up?", 'New York City', ['Chicago', 'Los Angeles', 'Miami'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-12', "Who directed 'The Nightmare Before Christmas'?", 'Henry Selick', ['Tim Burton', 'Terry Gilliam', 'Wes Anderson'], 'Holiday Movies', 'hard'),
  createQuestion('holiday-13', "What does Buddy the Elf put on his spaghetti?", 'Maple syrup', ['Chocolate sauce', 'Whipped cream', 'Honey'], 'Holiday Movies'),
  createQuestion('holiday-14', "In 'A Christmas Carol', what is Scrooge's first name?", 'Ebenezer', ['Edward', 'Edgar', 'Edmund'], 'Holiday Movies'),
  createQuestion('holiday-15', "What store is featured in 'Miracle on 34th Street'?", "Macy's", ['Bloomingdale\'s', 'Gimbels', 'Saks Fifth Avenue'], 'Holiday Movies'),
  createQuestion('holiday-16', "In 'National Lampoon\'s Christmas Vacation', what does Clark want to buy with his Christmas bonus?", 'A swimming pool', ['A new car', 'A vacation', 'A boat'], 'Holiday Movies'),
  createQuestion('holiday-17', "What phrase does the father keep saying in 'A Christmas Story'?", 'Fra-gee-lay', ['Wonderful', 'Christmas miracle', 'Holy smokes'], 'Holiday Movies'),
  createQuestion('holiday-18', "In 'Elf', what are the four main food groups according to elves?", 'Candy, candy canes, candy corns, and syrup', ['Cookies, milk, presents, trees', 'Sugar, chocolate, gum, mints', 'Cake, pie, ice cream, pudding'], 'Holiday Movies'),
  createQuestion('holiday-19', "What Christmas movie stars Macaulay Culkin defending his home?", 'Home Alone', ['The Good Son', 'My Girl', 'Richie Rich'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-20', "In 'How the Grinch Stole Christmas', what does the Grinch's heart do?", 'Grows three sizes', ['Melts', 'Turns red', 'Starts beating'], 'Holiday Movies'),
  createQuestion('holiday-21', "What is the name of the reindeer with a red nose?", 'Rudolph', ['Dasher', 'Prancer', 'Blitzen'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-22', "In 'Love Actually', what song does the Prime Minister dance to?", 'Jump (For My Love)', ['Last Christmas', 'Jingle Bell Rock', 'All I Want for Christmas'], 'Holiday Movies', 'hard'),
  createQuestion('holiday-23', "What actor plays six different roles in 'The Polar Express'?", 'Tom Hanks', ['Jim Carrey', 'Robin Williams', 'Eddie Murphy'], 'Holiday Movies'),
  createQuestion('holiday-24', "In 'A Christmas Story', what does the Old Man win?", 'A leg lamp', ['A turkey', 'A car', 'A TV'], 'Holiday Movies'),
  createQuestion('holiday-25', "What year was the original 'Miracle on 34th Street' released?", '1947', ['1945', '1950', '1952'], 'Holiday Movies'),
];

export function getQuestionsForGenre(genre: Genre): Question[] {
  let questions: Question[];

  switch (genre) {
    case 'eighties_music':
      questions = [...EIGHTIES_MUSIC_QUESTIONS];
      break;
    case 'tv_shows':
      questions = [...TV_SHOWS_QUESTIONS];
      break;
    case 'classic_movies':
      questions = [...CLASSIC_MOVIES_QUESTIONS];
      break;
    case 'holiday_movies':
      questions = [...HOLIDAY_MOVIES_QUESTIONS];
      break;
    case 'mix_it_up':
      // Mix questions from all categories
      const all = [
        ...EIGHTIES_MUSIC_QUESTIONS.slice(0, 5),
        ...TV_SHOWS_QUESTIONS.slice(0, 5),
        ...CLASSIC_MOVIES_QUESTIONS.slice(0, 5),
        ...HOLIDAY_MOVIES_QUESTIONS.slice(0, 5),
      ];
      questions = shuffleArray(all);
      break;
    default:
      questions = [...EIGHTIES_MUSIC_QUESTIONS];
  }

  // Shuffle and return 20 questions
  return shuffleArray(questions).slice(0, 20);
}
