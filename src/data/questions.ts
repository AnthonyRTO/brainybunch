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

// ========== 80's MUSIC ==========
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

// ========== 90's MUSIC ==========
export const NINETIES_MUSIC_QUESTIONS: Question[] = [
  createQuestion('90s-1', "Which band sang 'Smells Like Teen Spirit'?", 'Nirvana', ['Pearl Jam', 'Soundgarden', 'Alice in Chains'], "90's Music", 'easy'),
  createQuestion('90s-2', "What boy band sang 'I Want It That Way'?", 'Backstreet Boys', ['NSYNC', '98 Degrees', 'New Kids on the Block'], "90's Music", 'easy'),
  createQuestion('90s-3', "Who sang 'Wannabe'?", 'Spice Girls', ['Destiny\'s Child', 'TLC', 'En Vogue'], "90's Music", 'easy'),
  createQuestion('90s-4', "Which rapper released 'Lose Yourself'?", 'Eminem', ['Jay-Z', '50 Cent', 'Dr. Dre'], "90's Music"),
  createQuestion('90s-5', "What song has the lyrics 'Don't go chasing waterfalls'?", 'Waterfalls', ['Creep', 'No Scrubs', 'Red Light Special'], "90's Music"),
  createQuestion('90s-6', "Who performed 'My Heart Will Go On'?", 'Celine Dion', ['Whitney Houston', 'Mariah Carey', 'Barbra Streisand'], "90's Music"),
  createQuestion('90s-7', "Which band sang 'Creep'?", 'TLC', ['En Vogue', 'SWV', 'Destiny\'s Child'], "90's Music"),
  createQuestion('90s-8', "Who had a hit with 'MMMBop'?", 'Hanson', ['Backstreet Boys', 'NSYNC', 'LFO'], "90's Music"),
  createQuestion('90s-9', "What was Britney Spears' debut single?", '...Baby One More Time', ['Oops!...I Did It Again', 'Crazy', 'Sometimes'], "90's Music", 'easy'),
  createQuestion('90s-10', "Which band performed 'Under the Bridge'?", 'Red Hot Chili Peppers', ['Nirvana', 'Pearl Jam', 'Stone Temple Pilots'], "90's Music"),
  createQuestion('90s-11', "Who sang 'I Will Always Love You' in The Bodyguard?", 'Whitney Houston', ['Mariah Carey', 'Celine Dion', 'Toni Braxton'], "90's Music", 'easy'),
  createQuestion('90s-12', "What band had hits with 'Wonderwall' and 'Champagne Supernova'?", 'Oasis', ['Blur', 'Radiohead', 'Pulp'], "90's Music"),
  createQuestion('90s-13', "Who performed 'No Diggity'?", 'Blackstreet', ['Boyz II Men', 'Jodeci', 'Dru Hill'], "90's Music"),
  createQuestion('90s-14', "Which artist sang 'Vogue'?", 'Madonna', ['Janet Jackson', 'Paula Abdul', 'Mariah Carey'], "90's Music"),
  createQuestion('90s-15', "What was the best-selling album of the 1990s in the US?", 'Jagged Little Pill', ['Thriller', 'The Bodyguard Soundtrack', 'Titanic Soundtrack'], "90's Music", 'hard'),
  createQuestion('90s-16', "Who sang 'U Can't Touch This'?", 'MC Hammer', ['Vanilla Ice', 'Young MC', 'Tone Loc'], "90's Music"),
  createQuestion('90s-17', "Which group performed 'Jump Around'?", 'House of Pain', ['Cypress Hill', 'Beastie Boys', 'Run-DMC'], "90's Music"),
  createQuestion('90s-18', "Who had a hit with 'Black or White'?", 'Michael Jackson', ['Prince', 'Bobby Brown', 'MC Hammer'], "90's Music"),
  createQuestion('90s-19', "What band sang 'Losing My Religion'?", 'R.E.M.', ['U2', 'The Cure', 'Depeche Mode'], "90's Music"),
  createQuestion('90s-20', "Which artist released 'Fantasy' in 1995?", 'Mariah Carey', ['Whitney Houston', 'Janet Jackson', 'TLC'], "90's Music"),
  createQuestion('90s-21', "Who performed 'Ice Ice Baby'?", 'Vanilla Ice', ['MC Hammer', 'Snow', 'Young MC'], "90's Music", 'easy'),
  createQuestion('90s-22', "What Spice Girl was known as Posh Spice?", 'Victoria Beckham', ['Mel B', 'Emma Bunton', 'Geri Halliwell'], "90's Music"),
  createQuestion('90s-23', "Which band sang 'One' in 1991?", 'U2', ['R.E.M.', 'Metallica', 'Pearl Jam'], "90's Music"),
  createQuestion('90s-24', "Who had the hit 'Gangsta\'s Paradise'?", 'Coolio', ['Dr. Dre', 'Snoop Dogg', '2Pac'], "90's Music"),
  createQuestion('90s-25', "What duo sang 'Macarena'?", 'Los Del Rio', ['Ricky Martin', 'Enrique Iglesias', 'Chayanne'], "90's Music"),
];

// ========== 2000's MUSIC ==========
export const TWO_THOUSANDS_MUSIC_QUESTIONS: Question[] = [
  createQuestion('2000s-1', "Who sang 'Crazy in Love' featuring Jay-Z?", 'Beyoncé', ['Rihanna', 'Alicia Keys', 'Christina Aguilera'], "2000's Music", 'easy'),
  createQuestion('2000s-2', "Which artist released '8 Mile' and 'Lose Yourself'?", 'Eminem', ['50 Cent', 'Jay-Z', 'Kanye West'], "2000's Music", 'easy'),
  createQuestion('2000s-3', "What was Britney Spears' big 2000 hit?", 'Oops!...I Did It Again', ['Toxic', 'Stronger', 'Lucky'], "2000's Music"),
  createQuestion('2000s-4', "Who sang 'In Da Club'?", '50 Cent', ['Eminem', 'Nelly', 'Ja Rule'], "2000's Music"),
  createQuestion('2000s-5', "Which boy band sang 'Bye Bye Bye'?", 'NSYNC', ['Backstreet Boys', '98 Degrees', 'O-Town'], "2000's Music", 'easy'),
  createQuestion('2000s-6', "Who performed 'Hot in Herre'?", 'Nelly', ['Ludacris', 'Chingy', 'Ja Rule'], "2000's Music"),
  createQuestion('2000s-7', "What artist sang 'Since U Been Gone'?", 'Kelly Clarkson', ['Avril Lavigne', 'Pink', 'Ashlee Simpson'], "2000's Music"),
  createQuestion('2000s-8', "Which band performed 'Mr. Brightside'?", 'The Killers', ['Green Day', 'Fall Out Boy', 'My Chemical Romance'], "2000's Music"),
  createQuestion('2000s-9', "Who had a hit with 'Gold Digger'?", 'Kanye West', ['Jay-Z', '50 Cent', 'T.I.'], "2000's Music"),
  createQuestion('2000s-10', "What was Usher's huge 2004 hit?", 'Yeah!', ['Burn', 'Confessions Part II', 'My Boo'], "2000's Music"),
  createQuestion('2000s-11', "Which artist sang 'Umbrella'?", 'Rihanna', ['Beyoncé', 'Ciara', 'Ashanti'], "2000's Music", 'easy'),
  createQuestion('2000s-12', "Who performed 'Bring Me to Life'?", 'Evanescence', ['Linkin Park', 'Three Days Grace', 'Breaking Benjamin'], "2000's Music"),
  createQuestion('2000s-13', "What song features the lyrics 'I\'m a slave 4 U'?", "I'm a Slave 4 U", ['Toxic', 'Overprotected', 'Boys'], "2000's Music"),
  createQuestion('2000s-14', "Which pop star sang 'Genie in a Bottle'?", 'Christina Aguilera', ['Britney Spears', 'Jessica Simpson', 'Mandy Moore'], "2000's Music"),
  createQuestion('2000s-15', "Who had the hit 'American Idiot'?", 'Green Day', ['Blink-182', 'Sum 41', 'Good Charlotte'], "2000's Music"),
  createQuestion('2000s-16', "What artist released 'Hips Don't Lie'?", 'Shakira', ['Jennifer Lopez', 'Christina Aguilera', 'Beyoncé'], "2000's Music"),
  createQuestion('2000s-17', "Which band sang 'Sugar, We're Goin Down'?", 'Fall Out Boy', ['Panic! At The Disco', 'My Chemical Romance', 'Paramore'], "2000's Music"),
  createQuestion('2000s-18', "Who performed 'Irreplaceable'?", 'Beyoncé', ['Rihanna', 'Alicia Keys', 'Mary J. Blige'], "2000's Music"),
  createQuestion('2000s-19', "What was Justin Timberlake's first solo #1 hit?", 'SexyBack', ['Cry Me a River', 'Rock Your Body', 'Like I Love You'], "2000's Music"),
  createQuestion('2000s-20', "Who sang 'Complicated'?", 'Avril Lavigne', ['Michelle Branch', 'Vanessa Carlton', 'Ashlee Simpson'], "2000's Music"),
  createQuestion('2000s-21', "Which artist had 'Get the Party Started'?", 'Pink', ['Christina Aguilera', 'Gwen Stefani', 'Fergie'], "2000's Music"),
  createQuestion('2000s-22', "What band performed 'Boulevard of Broken Dreams'?", 'Green Day', ['The Killers', 'Coldplay', 'Foo Fighters'], "2000's Music"),
  createQuestion('2000s-23', "Who sang 'SexyBack'?", 'Justin Timberlake', ['Usher', 'Chris Brown', 'Ne-Yo'], "2000's Music"),
  createQuestion('2000s-24', "Which artist released 'Dilemma' with Kelly Rowland?", 'Nelly', ['Ja Rule', 'Ludacris', '50 Cent'], "2000's Music"),
  createQuestion('2000s-25', "What was Outkast's biggest hit?", 'Hey Ya!', ['The Way You Move', 'Roses', 'So Fresh, So Clean'], "2000's Music", 'easy'),
];

// ========== 90's/2000's TV SHOWS ==========
export const TV_SHOWS_QUESTIONS: Question[] = [
  createQuestion('tv-1', "What coffee shop do the Friends hang out at?", 'Central Perk', ['Java Joe\'s', 'The Coffee House', 'Cafe Mocha'], "90's/2000's TV", 'easy'),
  createQuestion('tv-2', "What is the name of the paper company in The Office?", 'Dunder Mifflin', ['Staples', 'Paper Plus', 'Scott\'s Tots Paper Co.'], "90's/2000's TV", 'easy'),
  createQuestion('tv-3', "What is Kramer's first name on Seinfeld?", 'Cosmo', ['George', 'Jerry', 'Newman'], "90's/2000's TV"),
  createQuestion('tv-4', "Which show features the phrase 'How you doin'?'", 'Friends', ['Seinfeld', 'Frasier', 'Will & Grace'], "90's/2000's TV", 'easy'),
  createQuestion('tv-5', "What city is Frasier set in?", 'Seattle', ['Boston', 'San Francisco', 'Chicago'], "90's/2000's TV"),
  createQuestion('tv-6', "What was Rachel's job at the end of Friends?", 'Fashion Executive at Louis Vuitton', ['Waitress', 'Buyer at Bloomingdale\'s', 'Personal Shopper'], "90's/2000's TV"),
  createQuestion('tv-7', "Who is Michael Scott's arch-nemesis from HR?", 'Toby Flenderson', ['Todd Packer', 'Jan Levinson', 'Charles Miner'], "90's/2000's TV"),
  createQuestion('tv-8', "What is the name of Jerry Seinfeld's neighbor across the hall?", 'Newman', ['Kramer', 'George', 'Frank'], "90's/2000's TV"),
  createQuestion('tv-9', "Who played Carrie Bradshaw in Sex and the City?", 'Sarah Jessica Parker', ['Kim Cattrall', 'Kristin Davis', 'Cynthia Nixon'], "90's/2000's TV"),
  createQuestion('tv-10', "What was the name of the bar in How I Met Your Mother?", "MacLaren's Pub", ['The Pub', 'Puzzles', 'Paddy\'s Pub'], "90's/2000's TV"),
  createQuestion('tv-11', "Which character says 'That\'s what she said' frequently?", 'Michael Scott', ['Dwight Schrute', 'Jim Halpert', 'Kevin Malone'], "90's/2000's TV", 'easy'),
  createQuestion('tv-12', "What is Chandler Bing's job?", 'Statistical Analysis and Data Reconfiguration', ['Accountant', 'Marketing', 'IT Consultant'], "90's/2000's TV", 'hard'),
  createQuestion('tv-13', "Which TV show introduced us to Springfield?", 'The Simpsons', ['Family Guy', 'South Park', 'King of the Hill'], "90's/2000's TV", 'easy'),
  createQuestion('tv-14', "What does Phoebe's most famous song describe?", 'A Smelly Cat', ['A Silly Dog', 'A Crazy Bird', 'A Lazy Mouse'], "90's/2000's TV"),
  createQuestion('tv-15', "What is the name of Dwight's farm?", 'Schrute Farms', ['Schrute Beets', 'Dwight\'s Den', 'The Beet Farm'], "90's/2000's TV"),
  createQuestion('tv-16', "In Friends, what was the name of Ross's monkey?", 'Marcel', ['Charlie', 'George', 'Clyde'], "90's/2000's TV"),
  createQuestion('tv-17', "What show features the catchphrase 'Yada yada yada'?", 'Seinfeld', ['Friends', 'Frasier', 'Cheers'], "90's/2000's TV"),
  createQuestion('tv-18', "What instrument does Ross play (badly)?", 'Keyboard', ['Guitar', 'Drums', 'Saxophone'], "90's/2000's TV"),
  createQuestion('tv-19', "How many seasons did Friends run?", '10', ['8', '9', '12'], "90's/2000's TV"),
  createQuestion('tv-20', "What city is Will & Grace set in?", 'New York City', ['Los Angeles', 'Chicago', 'San Francisco'], "90's/2000's TV"),
  createQuestion('tv-21', "Who is Jim's love interest in The Office?", 'Pam Beesly', ['Angela Martin', 'Kelly Kapoor', 'Karen Filippelli'], "90's/2000's TV", 'easy'),
  createQuestion('tv-22', "What show features Ted Mosby telling his kids a story?", 'How I Met Your Mother', ['Friends', 'The Big Bang Theory', 'New Girl'], "90's/2000's TV"),
  createQuestion('tv-23', "In Seinfeld, what is George's famous declaration about?", 'The sea (Marine Biologist)', ['Architecture', 'Medicine', 'Law'], "90's/2000's TV"),
  createQuestion('tv-24', "What is the name of Monica's restaurant in Friends?", 'Javu', ['Alessandro\'s', 'Central Perk', 'The Moondance Diner'], "90's/2000's TV", 'hard'),
  createQuestion('tv-25', "Who plays Barney Stinson in How I Met Your Mother?", 'Neil Patrick Harris', ['Jason Segel', 'Josh Radnor', 'Bob Saget'], "90's/2000's TV"),
];

// ========== CLASSIC MOVIES ==========
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
  createQuestion('classic-12', "What classic film features the line 'Frankly, my dear, I don\'t give a damn'?", 'Gone with the Wind', ['Casablanca', 'The Maltese Falcon', 'Citizen Kane'], 'Classic Movies', 'easy'),
  createQuestion('classic-13', "Who was known as 'The King of Hollywood'?", 'Clark Gable', ['Cary Grant', 'James Stewart', 'Gary Cooper'], 'Classic Movies'),
  createQuestion('classic-14', "What 1939 film features the line 'There\'s no place like home'?", 'The Wizard of Oz', ['Gone with the Wind', 'Mr. Smith Goes to Washington', 'Stagecoach'], 'Classic Movies', 'easy'),
  createQuestion('classic-15', "Who starred opposite Katharine Hepburn in 'The African Queen'?", 'Humphrey Bogart', ['Spencer Tracy', 'Cary Grant', 'James Stewart'], 'Classic Movies'),
  createQuestion('classic-16', "Who directed 'Rear Window' and 'Vertigo'?", 'Alfred Hitchcock', ['Billy Wilder', 'John Huston', 'Otto Preminger'], 'Classic Movies'),
  createQuestion('classic-17', "In 'Sunset Boulevard', what is Norma Desmond's profession?", 'Silent film actress', ['Opera singer', 'Stage actress', 'Dancer'], 'Classic Movies'),
  createQuestion('classic-18', "Who played the lead in 'Roman Holiday' (1953)?", 'Audrey Hepburn', ['Grace Kelly', 'Elizabeth Taylor', 'Ingrid Bergman'], 'Classic Movies'),
  createQuestion('classic-19', "What classic film features the song 'As Time Goes By'?", 'Casablanca', ['An American in Paris', 'Singin\' in the Rain', 'The Band Wagon'], 'Classic Movies'),
  createQuestion('classic-20', "Who was Fred Astaire's most famous dance partner?", 'Ginger Rogers', ['Cyd Charisse', 'Rita Hayworth', 'Eleanor Powell'], 'Classic Movies'),
  createQuestion('classic-21', "Who directed 'The Maltese Falcon' (1941)?", 'John Huston', ['Howard Hawks', 'William Wyler', 'Michael Curtiz'], 'Classic Movies'),
  createQuestion('classic-22', "What year was 'Gone with the Wind' released?", '1939', ['1937', '1941', '1943'], 'Classic Movies'),
  createQuestion('classic-23', "Who played the title role in 'Cleopatra' (1963)?", 'Elizabeth Taylor', ['Audrey Hepburn', 'Sophia Loren', 'Vivien Leigh'], 'Classic Movies'),
  createQuestion('classic-24', "What film features the quote 'I coulda been a contender'?", 'On the Waterfront', ['A Streetcar Named Desire', 'The Godfather', 'Raging Bull'], 'Classic Movies'),
  createQuestion('classic-25', "Who directed 'Ben-Hur' (1959)?", 'William Wyler', ['Cecil B. DeMille', 'John Ford', 'David Lean'], 'Classic Movies'),
];

// ========== HOLIDAY MOVIES ==========
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
  createQuestion('holiday-12', "What does Buddy the Elf put on his spaghetti?", 'Maple syrup', ['Chocolate sauce', 'Whipped cream', 'Honey'], 'Holiday Movies'),
  createQuestion('holiday-13', "In 'A Christmas Carol', what is Scrooge's first name?", 'Ebenezer', ['Edward', 'Edgar', 'Edmund'], 'Holiday Movies'),
  createQuestion('holiday-14', "What store is featured in 'Miracle on 34th Street'?", "Macy's", ['Bloomingdale\'s', 'Gimbels', 'Saks Fifth Avenue'], 'Holiday Movies'),
  createQuestion('holiday-15', "In 'National Lampoon\'s Christmas Vacation', what does Clark want to buy with his Christmas bonus?", 'A swimming pool', ['A new car', 'A vacation', 'A boat'], 'Holiday Movies'),
  createQuestion('holiday-16', "What phrase does the father keep saying in 'A Christmas Story'?", 'Fra-gee-lay', ['Wonderful', 'Christmas miracle', 'Holy smokes'], 'Holiday Movies'),
  createQuestion('holiday-17', "In 'Elf', what are the four main food groups according to elves?", 'Candy, candy canes, candy corns, and syrup', ['Cookies, milk, presents, trees', 'Sugar, chocolate, gum, mints', 'Cake, pie, ice cream, pudding'], 'Holiday Movies'),
  createQuestion('holiday-18', "What Christmas movie stars Macaulay Culkin defending his home?", 'Home Alone', ['The Good Son', 'My Girl', 'Richie Rich'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-19', "In 'How the Grinch Stole Christmas', what does the Grinch's heart do?", 'Grows three sizes', ['Melts', 'Turns red', 'Starts beating'], 'Holiday Movies'),
  createQuestion('holiday-20', "What is the name of the reindeer with a red nose?", 'Rudolph', ['Dasher', 'Prancer', 'Blitzen'], 'Holiday Movies', 'easy'),
  createQuestion('holiday-21', "What actor plays six different roles in 'The Polar Express'?", 'Tom Hanks', ['Jim Carrey', 'Robin Williams', 'Eddie Murphy'], 'Holiday Movies'),
  createQuestion('holiday-22', "In 'A Christmas Story', what does the Old Man win?", 'A leg lamp', ['A turkey', 'A car', 'A TV'], 'Holiday Movies'),
  createQuestion('holiday-23', "What year was the original 'Miracle on 34th Street' released?", '1947', ['1945', '1950', '1952'], 'Holiday Movies'),
  createQuestion('holiday-24', "Who directed 'The Nightmare Before Christmas'?", 'Henry Selick', ['Tim Burton', 'Terry Gilliam', 'Wes Anderson'], 'Holiday Movies', 'hard'),
  createQuestion('holiday-25', "In 'Love Actually', what song does the Prime Minister dance to?", 'Jump (For My Love)', ['Last Christmas', 'Jingle Bell Rock', 'All I Want for Christmas'], 'Holiday Movies', 'hard'),
];

// ========== DISNEY MOVIES ==========
export const DISNEY_MOVIES_QUESTIONS: Question[] = [
  createQuestion('disney-1', "What is the name of the clownfish in 'Finding Nemo'?", 'Nemo', ['Marlin', 'Dory', 'Gill'], 'Disney Movies', 'easy'),
  createQuestion('disney-2', "In 'The Lion King', what is Simba's father's name?", 'Mufasa', ['Scar', 'Zazu', 'Rafiki'], 'Disney Movies', 'easy'),
  createQuestion('disney-3', "What does Elsa sing in 'Frozen'?", 'Let It Go', ['Do You Want to Build a Snowman', 'For the First Time in Forever', 'Love Is an Open Door'], 'Disney Movies', 'easy'),
  createQuestion('disney-4', "Who is Woody's owner in 'Toy Story'?", 'Andy', ['Sid', 'Bonnie', 'Al'], 'Disney Movies', 'easy'),
  createQuestion('disney-5', "What kind of creature is Maui in 'Moana'?", 'Demigod', ['God', 'Human', 'Spirit'], 'Disney Movies'),
  createQuestion('disney-6', "In 'Beauty and the Beast', what is the Beast's real name?", 'Prince Adam', ['Prince Eric', 'Prince Philip', 'Prince Charming'], 'Disney Movies', 'hard'),
  createQuestion('disney-7', "What color is Sulley in 'Monsters, Inc.'?", 'Blue with purple spots', ['Green', 'Red', 'Orange'], 'Disney Movies'),
  createQuestion('disney-8', "Who is the villain in 'The Little Mermaid'?", 'Ursula', ['Maleficent', 'Cruella', 'The Evil Queen'], 'Disney Movies', 'easy'),
  createQuestion('disney-9', "What does WALL-E stand for?", 'Waste Allocation Load Lifter Earth-class', ['World Automated Loader', 'Waste Automated Lifter', 'Work Allocation Loader'], 'Disney Movies', 'hard'),
  createQuestion('disney-10', "In 'Aladdin', what is the name of the princess?", 'Jasmine', ['Aurora', 'Belle', 'Ariel'], 'Disney Movies', 'easy'),
  createQuestion('disney-11', "What year was the first 'Toy Story' released?", '1995', ['1993', '1997', '1999'], 'Disney Movies'),
  createQuestion('disney-12', "Who voices Dory in 'Finding Nemo'?", 'Ellen DeGeneres', ['Whoopi Goldberg', 'Oprah Winfrey', 'Rosie O\'Donnell'], 'Disney Movies'),
  createQuestion('disney-13', "In 'The Incredibles', what is Mr. Incredible's real name?", 'Bob Parr', ['Robert Smith', 'Bill Parker', 'Bruce Patterson'], 'Disney Movies'),
  createQuestion('disney-14', "What kind of animal is Bambi?", 'Deer', ['Rabbit', 'Skunk', 'Owl'], 'Disney Movies', 'easy'),
  createQuestion('disney-15', "Who is the snowman in 'Frozen'?", 'Olaf', ['Sven', 'Kristoff', 'Hans'], 'Disney Movies', 'easy'),
  createQuestion('disney-16', "In 'Up', what is the name of the old man?", 'Carl Fredricksen', ['Charles Muntz', 'Russell', 'Dug'], 'Disney Movies'),
  createQuestion('disney-17', "What does Rapunzel's hair do in 'Tangled'?", 'Glows and heals', ['Grows longer', 'Changes color', 'Grants wishes'], 'Disney Movies'),
  createQuestion('disney-18', "Who is the main character in 'Ratatouille'?", 'Remy', ['Linguini', 'Gusteau', 'Colette'], 'Disney Movies'),
  createQuestion('disney-19', "In 'Coco', what does Miguel want to be?", 'A musician', ['A chef', 'A painter', 'A dancer'], 'Disney Movies'),
  createQuestion('disney-20', "What is the name of Simba's best friend?", 'Nala', ['Kiara', 'Sarabi', 'Shenzi'], 'Disney Movies'),
  createQuestion('disney-21', "In 'Zootopia', what kind of animal is Judy Hopps?", 'Rabbit', ['Fox', 'Sheep', 'Lion'], 'Disney Movies', 'easy'),
  createQuestion('disney-22', "Who is the fairy in 'Peter Pan'?", 'Tinker Bell', ['Silvermist', 'Rosetta', 'Fawn'], 'Disney Movies', 'easy'),
  createQuestion('disney-23', "What is the name of the rat chef in 'Ratatouille'?", 'Remy', ['Emile', 'Django', 'Gusteau'], 'Disney Movies'),
  createQuestion('disney-24', "In 'Inside Out', what color is Sadness?", 'Blue', ['Purple', 'Gray', 'Green'], 'Disney Movies', 'easy'),
  createQuestion('disney-25', "Who says 'To infinity and beyond!'?", 'Buzz Lightyear', ['Woody', 'Rex', 'Mr. Potato Head'], 'Disney Movies', 'easy'),
];

// ========== SPORTS LEGENDS ==========
export const SPORTS_LEGENDS_QUESTIONS: Question[] = [
  createQuestion('sports-1', "How many NBA championships did Michael Jordan win?", '6', ['5', '7', '4'], 'Sports Legends', 'easy'),
  createQuestion('sports-2', "What team did Babe Ruth famously play for?", 'New York Yankees', ['Boston Red Sox', 'Chicago Cubs', 'St. Louis Cardinals'], 'Sports Legends'),
  createQuestion('sports-3', "Who is known as 'The Greatest' in boxing?", 'Muhammad Ali', ['Mike Tyson', 'Floyd Mayweather', 'Joe Louis'], 'Sports Legends', 'easy'),
  createQuestion('sports-4', "How many Super Bowls did Tom Brady win?", '7', ['5', '6', '8'], 'Sports Legends'),
  createQuestion('sports-5', "What country is soccer legend Pelé from?", 'Brazil', ['Argentina', 'Portugal', 'Spain'], 'Sports Legends', 'easy'),
  createQuestion('sports-6', "Who holds the record for most Olympic gold medals?", 'Michael Phelps', ['Usain Bolt', 'Carl Lewis', 'Mark Spitz'], 'Sports Legends'),
  createQuestion('sports-7', "What sport is Tiger Woods famous for?", 'Golf', ['Tennis', 'Baseball', 'Basketball'], 'Sports Legends', 'easy'),
  createQuestion('sports-8', "Who is known as 'The Great One' in hockey?", 'Wayne Gretzky', ['Mario Lemieux', 'Bobby Orr', 'Gordie Howe'], 'Sports Legends'),
  createQuestion('sports-9', "What team did Derek Jeter play for his entire career?", 'New York Yankees', ['Boston Red Sox', 'New York Mets', 'Los Angeles Dodgers'], 'Sports Legends'),
  createQuestion('sports-10', "How many Grand Slam titles has Serena Williams won?", '23', ['20', '25', '21'], 'Sports Legends'),
  createQuestion('sports-11', "What position did Joe Montana play?", 'Quarterback', ['Running Back', 'Wide Receiver', 'Linebacker'], 'Sports Legends', 'easy'),
  createQuestion('sports-12', "Who is the all-time leading scorer in NBA history?", 'LeBron James', ['Kareem Abdul-Jabbar', 'Michael Jordan', 'Kobe Bryant'], 'Sports Legends'),
  createQuestion('sports-13', "What country is tennis star Roger Federer from?", 'Switzerland', ['Sweden', 'Germany', 'Austria'], 'Sports Legends'),
  createQuestion('sports-14', "Who won 8 gold medals at the 2008 Beijing Olympics?", 'Michael Phelps', ['Usain Bolt', 'Ryan Lochte', 'Ian Thorpe'], 'Sports Legends'),
  createQuestion('sports-15', "What team did Magic Johnson play for?", 'Los Angeles Lakers', ['Boston Celtics', 'Chicago Bulls', 'Detroit Pistons'], 'Sports Legends'),
  createQuestion('sports-16', "Who is known as 'Air Jordan'?", 'Michael Jordan', ['LeBron James', 'Kobe Bryant', 'Julius Erving'], 'Sports Legends', 'easy'),
  createQuestion('sports-17', "What sport did Jackie Robinson integrate in 1947?", 'Baseball', ['Basketball', 'Football', 'Golf'], 'Sports Legends'),
  createQuestion('sports-18', "Who holds the record for most career home runs?", 'Barry Bonds', ['Hank Aaron', 'Babe Ruth', 'Willie Mays'], 'Sports Legends'),
  createQuestion('sports-19', "What country is soccer star Cristiano Ronaldo from?", 'Portugal', ['Brazil', 'Spain', 'Argentina'], 'Sports Legends', 'easy'),
  createQuestion('sports-20', "Who won the 'Miracle on Ice' hockey game in 1980?", 'USA', ['Soviet Union', 'Canada', 'Finland'], 'Sports Legends'),
  createQuestion('sports-21', "What jersey number did Kobe Bryant wear (both numbers)?", '8 and 24', ['23 and 45', '32 and 33', '12 and 21'], 'Sports Legends'),
  createQuestion('sports-22', "Who is the fastest man in the world?", 'Usain Bolt', ['Carl Lewis', 'Tyson Gay', 'Justin Gatlin'], 'Sports Legends', 'easy'),
  createQuestion('sports-23', "What team drafted Peyton Manning first overall in 1998?", 'Indianapolis Colts', ['Denver Broncos', 'San Diego Chargers', 'Tennessee Titans'], 'Sports Legends'),
  createQuestion('sports-24', "Who has won the most Masters golf tournaments?", 'Jack Nicklaus', ['Tiger Woods', 'Arnold Palmer', 'Phil Mickelson'], 'Sports Legends'),
  createQuestion('sports-25', "What country dominates in the sport of cricket?", 'India', ['England', 'Australia', 'Pakistan'], 'Sports Legends'),
];

// ========== FOOD & DRINKS ==========
export const FOOD_DRINKS_QUESTIONS: Question[] = [
  createQuestion('food-1', "What is the main ingredient in guacamole?", 'Avocado', ['Tomato', 'Onion', 'Lime'], 'Food & Drinks', 'easy'),
  createQuestion('food-2', "What country is sushi originally from?", 'Japan', ['China', 'Korea', 'Thailand'], 'Food & Drinks', 'easy'),
  createQuestion('food-3', "What is the most popular pizza topping in America?", 'Pepperoni', ['Mushrooms', 'Sausage', 'Extra Cheese'], 'Food & Drinks'),
  createQuestion('food-4', "What fast food restaurant is famous for the Big Mac?", "McDonald's", ['Burger King', 'Wendy\'s', 'Five Guys'], 'Food & Drinks', 'easy'),
  createQuestion('food-5', "What type of pasta is shaped like bow ties?", 'Farfalle', ['Penne', 'Rigatoni', 'Fusilli'], 'Food & Drinks'),
  createQuestion('food-6', "What is the main ingredient in hummus?", 'Chickpeas', ['Lentils', 'Black beans', 'Fava beans'], 'Food & Drinks'),
  createQuestion('food-7', "What country is Champagne from?", 'France', ['Italy', 'Spain', 'Germany'], 'Food & Drinks', 'easy'),
  createQuestion('food-8', "What is the most consumed beverage in the world after water?", 'Tea', ['Coffee', 'Beer', 'Soda'], 'Food & Drinks'),
  createQuestion('food-9', "What fruit is used to make wine?", 'Grapes', ['Apples', 'Berries', 'Peaches'], 'Food & Drinks', 'easy'),
  createQuestion('food-10', "What is the name of the Japanese rice wine?", 'Sake', ['Soju', 'Baijiu', 'Shochu'], 'Food & Drinks'),
  createQuestion('food-11', "What cheese is traditionally used on a Margherita pizza?", 'Mozzarella', ['Parmesan', 'Cheddar', 'Provolone'], 'Food & Drinks'),
  createQuestion('food-12', "What is the main ingredient in a traditional Caesar salad dressing?", 'Anchovy', ['Mustard', 'Mayonnaise', 'Yogurt'], 'Food & Drinks'),
  createQuestion('food-13', "What country invented French fries?", 'Belgium', ['France', 'Netherlands', 'Germany'], 'Food & Drinks', 'hard'),
  createQuestion('food-14', "What is wasabi made from?", 'Japanese horseradish', ['Mustard', 'Green chili', 'Ginger'], 'Food & Drinks'),
  createQuestion('food-15', "What is the hottest chili pepper in the world?", 'Carolina Reaper', ['Ghost Pepper', 'Habanero', 'Scotch Bonnet'], 'Food & Drinks'),
  createQuestion('food-16', "What Italian city is known for its Bolognese sauce?", 'Bologna', ['Rome', 'Milan', 'Naples'], 'Food & Drinks'),
  createQuestion('food-17', "What is the national dish of Spain?", 'Paella', ['Tapas', 'Gazpacho', 'Tortilla Española'], 'Food & Drinks'),
  createQuestion('food-18', "What grain is used to make traditional Italian risotto?", 'Arborio rice', ['Basmati rice', 'Jasmine rice', 'Wild rice'], 'Food & Drinks'),
  createQuestion('food-19', "What is the main ingredient in a traditional margarita?", 'Tequila', ['Rum', 'Vodka', 'Gin'], 'Food & Drinks', 'easy'),
  createQuestion('food-20', "What country is the croissant originally from?", 'Austria', ['France', 'Italy', 'Belgium'], 'Food & Drinks', 'hard'),
  createQuestion('food-21', "What is the most expensive spice in the world by weight?", 'Saffron', ['Vanilla', 'Cardamom', 'Cinnamon'], 'Food & Drinks'),
  createQuestion('food-22', "What is a sommelier an expert in?", 'Wine', ['Cheese', 'Coffee', 'Chocolate'], 'Food & Drinks'),
  createQuestion('food-23', "What type of food is a 'bao'?", 'Steamed bun', ['Noodle', 'Dumpling', 'Rice dish'], 'Food & Drinks'),
  createQuestion('food-24', "What fast food chain has the slogan 'Have it your way'?", 'Burger King', ['McDonald\'s', 'Wendy\'s', 'Subway'], 'Food & Drinks'),
  createQuestion('food-25', "What country is feta cheese from?", 'Greece', ['Italy', 'Turkey', 'France'], 'Food & Drinks'),
];

// ========== 80's/90's CARTOONS ==========
export const CARTOONS_QUESTIONS: Question[] = [
  createQuestion('cartoon-1', "What are the names of the Teenage Mutant Ninja Turtles?", 'Leonardo, Donatello, Raphael, Michelangelo', ['Leo, Don, Raph, Mike', 'Larry, David, Robert, Michael', 'Luke, Derek, Ryan, Matt'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-2', "What is the name of the baby in 'Rugrats'?", 'Tommy Pickles', ['Chuckie Finster', 'Phil DeVille', 'Dil Pickles'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-3', "In 'Transformers', what do the Autobots transform into?", 'Vehicles', ['Animals', 'Weapons', 'Buildings'], "80's/90's Cartoons"),
  createQuestion('cartoon-4', "What is Scooby-Doo's full name?", 'Scoobert Doo', ['Scooby Doobert', 'Scooby Doo Jr.', 'Scoobius Doo'], "80's/90's Cartoons"),
  createQuestion('cartoon-5', "Who is He-Man's alter ego?", 'Prince Adam', ['Prince Eric', 'Prince David', 'Prince William'], "80's/90's Cartoons"),
  createQuestion('cartoon-6', "What color is Optimus Prime?", 'Red and Blue', ['Yellow and Black', 'Green and Purple', 'Orange and White'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-7', "In 'ThunderCats', what is Lion-O's weapon called?", 'Sword of Omens', ['Blade of Thunder', 'Cat Claw', 'Thunder Blade'], "80's/90's Cartoons"),
  createQuestion('cartoon-8', "What pizza do the Ninja Turtles love?", 'Any pizza, especially pepperoni', ['Cheese only', 'Hawaiian', 'Veggie'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-9', "Who is the villain in 'Inspector Gadget'?", 'Dr. Claw', ['Dr. Evil', 'Dr. Doom', 'Dr. Mad'], "80's/90's Cartoons"),
  createQuestion('cartoon-10', "What show features Beavis and Butt-Head?", 'Beavis and Butt-Head', ['South Park', 'The Simpsons', 'King of the Hill'], "80's/90's Cartoons"),
  createQuestion('cartoon-11', "In 'G.I. Joe', what is the enemy organization called?", 'Cobra', ['Hydra', 'Viper', 'Scorpion'], "80's/90's Cartoons"),
  createQuestion('cartoon-12', "What are the Care Bears known for?", 'Caring and sharing', ['Fighting', 'Racing', 'Cooking'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-13', "Who says 'What's up, Doc?'", 'Bugs Bunny', ['Daffy Duck', 'Porky Pig', 'Elmer Fudd'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-14', "In 'DuckTales', who is Scrooge McDuck's butler?", 'Duckworth', ['Jeeves', 'Alfred', 'Wadsworth'], "80's/90's Cartoons"),
  createQuestion('cartoon-15', "What is the name of Jem's band?", 'The Holograms', ['The Misfits', 'The Stars', 'The Gems'], "80's/90's Cartoons"),
  createQuestion('cartoon-16', "Who is SpongeBob SquarePants' best friend?", 'Patrick Star', ['Squidward', 'Sandy Cheeks', 'Mr. Krabs'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-17', "What is the name of Angelica's doll in 'Rugrats'?", 'Cynthia', ['Barbie', 'Suzie', 'Brittany'], "80's/90's Cartoons"),
  createQuestion('cartoon-18', "In 'Dexter's Laboratory', who is Dexter's annoying sister?", 'Dee Dee', ['Debbie', 'Diana', 'Donna'], "80's/90's Cartoons"),
  createQuestion('cartoon-19', "What show features Johnny Bravo?", 'Johnny Bravo', ['The Powerpuff Girls', 'Cow and Chicken', 'Ed, Edd n Eddy'], "80's/90's Cartoons"),
  createQuestion('cartoon-20', "Who created The Powerpuff Girls?", 'Professor Utonium', ['Professor X', 'Dr. Light', 'Dr. Brains'], "80's/90's Cartoons"),
  createQuestion('cartoon-21', "What animal is Arthur?", 'Aardvark', ['Bear', 'Mouse', 'Rabbit'], "80's/90's Cartoons"),
  createQuestion('cartoon-22', "In 'Pinky and the Brain', what do they try to do every night?", 'Take over the world', ['Find cheese', 'Escape the lab', 'Make friends'], "80's/90's Cartoons"),
  createQuestion('cartoon-23', "What is the name of the cat in 'Tom and Jerry'?", 'Tom', ['Jerry', 'Spike', 'Butch'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-24', "Who lives in a pineapple under the sea?", 'SpongeBob SquarePants', ['Patrick Star', 'Squidward', 'Mr. Krabs'], "80's/90's Cartoons", 'easy'),
  createQuestion('cartoon-25', "What show features Heffer and Rocko?", "Rocko's Modern Life", ['Ren & Stimpy', 'Angry Beavers', 'CatDog'], "80's/90's Cartoons"),
];

// ========== VIDEO GAMES ==========
export const VIDEO_GAMES_QUESTIONS: Question[] = [
  createQuestion('games-1', "What is the best-selling video game of all time?", 'Minecraft', ['Tetris', 'GTA V', 'Wii Sports'], 'Video Games'),
  createQuestion('games-2', "What is Mario's brother's name?", 'Luigi', ['Wario', 'Toad', 'Bowser'], 'Video Games', 'easy'),
  createQuestion('games-3', "In what game do you catch creatures called Pokémon?", 'Pokémon', ['Digimon', 'Monster Hunter', 'Yo-kai Watch'], 'Video Games', 'easy'),
  createQuestion('games-4', "What company created the PlayStation?", 'Sony', ['Nintendo', 'Microsoft', 'Sega'], 'Video Games', 'easy'),
  createQuestion('games-5', "What is the name of the princess Mario rescues?", 'Princess Peach', ['Princess Zelda', 'Princess Daisy', 'Princess Rosalina'], 'Video Games', 'easy'),
  createQuestion('games-6', "In 'The Legend of Zelda', what is the hero's name?", 'Link', ['Zelda', 'Ganon', 'Epona'], 'Video Games'),
  createQuestion('games-7', "What game features the character Master Chief?", 'Halo', ['Call of Duty', 'Gears of War', 'Destiny'], 'Video Games'),
  createQuestion('games-8', "What classic game features falling blocks?", 'Tetris', ['Pong', 'Snake', 'Breakout'], 'Video Games', 'easy'),
  createQuestion('games-9', "What year was the original Nintendo Entertainment System released in North America?", '1985', ['1983', '1987', '1989'], 'Video Games'),
  createQuestion('games-10', "In 'Fortnite', what is the main game mode called?", 'Battle Royale', ['Team Deathmatch', 'Capture the Flag', 'Survival'], 'Video Games'),
  createQuestion('games-11', "What is Sonic the Hedgehog's signature color?", 'Blue', ['Red', 'Green', 'Yellow'], 'Video Games', 'easy'),
  createQuestion('games-12', "What game features the phrase 'The cake is a lie'?", 'Portal', ['Half-Life', 'BioShock', 'System Shock'], 'Video Games'),
  createQuestion('games-13', "In 'Grand Theft Auto V', what city is the game set in?", 'Los Santos', ['Liberty City', 'Vice City', 'San Fierro'], 'Video Games'),
  createQuestion('games-14', "What was the first commercially successful video game?", 'Pong', ['Space Invaders', 'Pac-Man', 'Asteroids'], 'Video Games'),
  createQuestion('games-15', "What company makes the Xbox?", 'Microsoft', ['Sony', 'Nintendo', 'Sega'], 'Video Games', 'easy'),
  createQuestion('games-16', "In 'Call of Duty', what does the killstreak 'UAV' stand for?", 'Unmanned Aerial Vehicle', ['Universal Attack Vehicle', 'Ultimate Assault Vehicle', 'Unified Air Vehicle'], 'Video Games'),
  createQuestion('games-17', "What game popularized the phrase 'Winner Winner Chicken Dinner'?", 'PUBG', ['Fortnite', 'Apex Legends', 'Call of Duty Warzone'], 'Video Games'),
  createQuestion('games-18', "Who is the main antagonist in the original 'Donkey Kong'?", 'Donkey Kong', ['Mario', 'Bowser', 'King K. Rool'], 'Video Games'),
  createQuestion('games-19', "What is the name of the blocky sandbox game created by Markus Persson?", 'Minecraft', ['Roblox', 'Terraria', 'Lego Worlds'], 'Video Games', 'easy'),
  createQuestion('games-20', "In 'Street Fighter II', what is Ryu's signature move?", 'Hadouken', ['Shoryuken', 'Tatsumaki', 'Sonic Boom'], 'Video Games'),
  createQuestion('games-21', "What Nintendo character has appeared in the most games?", 'Mario', ['Link', 'Pikachu', 'Donkey Kong'], 'Video Games'),
  createQuestion('games-22', "What is the highest-grossing video game franchise?", 'Pokémon', ['Mario', 'Call of Duty', 'Grand Theft Auto'], 'Video Games'),
  createQuestion('games-23', "In 'Among Us', what are the impostors trying to do?", 'Kill the crewmates', ['Fix the ship', 'Find treasure', 'Escape'], 'Video Games'),
  createQuestion('games-24', "What game features the character Kratos?", 'God of War', ['Devil May Cry', 'Darksiders', 'Dante\'s Inferno'], 'Video Games'),
  createQuestion('games-25', "What year did 'World of Warcraft' launch?", '2004', ['2002', '2006', '2008'], 'Video Games'),
];

// ========== WORLD GEOGRAPHY ==========
export const WORLD_GEOGRAPHY_QUESTIONS: Question[] = [
  createQuestion('geo-1', "What is the capital of France?", 'Paris', ['London', 'Berlin', 'Madrid'], 'World Geography', 'easy'),
  createQuestion('geo-2', "What is the longest river in the world?", 'Nile', ['Amazon', 'Mississippi', 'Yangtze'], 'World Geography'),
  createQuestion('geo-3', "What country has the largest population?", 'India', ['China', 'USA', 'Indonesia'], 'World Geography'),
  createQuestion('geo-4', "What is the smallest country in the world?", 'Vatican City', ['Monaco', 'San Marino', 'Liechtenstein'], 'World Geography'),
  createQuestion('geo-5', "What ocean is the largest?", 'Pacific Ocean', ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], 'World Geography', 'easy'),
  createQuestion('geo-6', "What is the capital of Australia?", 'Canberra', ['Sydney', 'Melbourne', 'Brisbane'], 'World Geography'),
  createQuestion('geo-7', "What mountain is the tallest in the world?", 'Mount Everest', ['K2', 'Kangchenjunga', 'Makalu'], 'World Geography', 'easy'),
  createQuestion('geo-8', "What country is shaped like a boot?", 'Italy', ['Spain', 'Portugal', 'Greece'], 'World Geography', 'easy'),
  createQuestion('geo-9', "What is the capital of Japan?", 'Tokyo', ['Kyoto', 'Osaka', 'Hiroshima'], 'World Geography', 'easy'),
  createQuestion('geo-10', "What desert is the largest in the world?", 'Sahara', ['Gobi', 'Arabian', 'Kalahari'], 'World Geography'),
  createQuestion('geo-11', "What country has the most time zones?", 'France', ['Russia', 'USA', 'China'], 'World Geography', 'hard'),
  createQuestion('geo-12', "What is the capital of Brazil?", 'Brasília', ['Rio de Janeiro', 'São Paulo', 'Salvador'], 'World Geography'),
  createQuestion('geo-13', "What continent is Egypt in?", 'Africa', ['Asia', 'Europe', 'Middle East'], 'World Geography'),
  createQuestion('geo-14', "What is the capital of Canada?", 'Ottawa', ['Toronto', 'Vancouver', 'Montreal'], 'World Geography'),
  createQuestion('geo-15', "What country is home to the Great Wall?", 'China', ['Japan', 'Korea', 'Mongolia'], 'World Geography', 'easy'),
  createQuestion('geo-16', "What is the largest island in the world?", 'Greenland', ['Australia', 'New Guinea', 'Borneo'], 'World Geography'),
  createQuestion('geo-17', "What country is the Eiffel Tower in?", 'France', ['Italy', 'Spain', 'Germany'], 'World Geography', 'easy'),
  createQuestion('geo-18', "What is the capital of Germany?", 'Berlin', ['Munich', 'Frankfurt', 'Hamburg'], 'World Geography', 'easy'),
  createQuestion('geo-19', "What river runs through London?", 'Thames', ['Seine', 'Danube', 'Rhine'], 'World Geography'),
  createQuestion('geo-20', "What country is home to the Taj Mahal?", 'India', ['Pakistan', 'Bangladesh', 'Nepal'], 'World Geography', 'easy'),
  createQuestion('geo-21', "What is the capital of South Korea?", 'Seoul', ['Busan', 'Pyongyang', 'Incheon'], 'World Geography'),
  createQuestion('geo-22', "What country has the most islands?", 'Sweden', ['Finland', 'Indonesia', 'Philippines'], 'World Geography', 'hard'),
  createQuestion('geo-23', "What is the deepest lake in the world?", 'Lake Baikal', ['Lake Superior', 'Lake Tanganyika', 'Caspian Sea'], 'World Geography'),
  createQuestion('geo-24', "What is the capital of Egypt?", 'Cairo', ['Alexandria', 'Luxor', 'Giza'], 'World Geography'),
  createQuestion('geo-25', "What two countries share the longest border?", 'USA and Canada', ['Russia and China', 'Argentina and Chile', 'India and China'], 'World Geography'),
];

// ========== FAMILY SITCOMS ==========
export const FAMILY_SITCOMS_QUESTIONS: Question[] = [
  createQuestion('sitcom-1', "In 'Full House', what city does the Tanner family live in?", 'San Francisco', ['Los Angeles', 'Seattle', 'Chicago'], 'Family Sitcoms'),
  createQuestion('sitcom-2', "What is the name of the butler in 'Fresh Prince of Bel-Air'?", 'Geoffrey', ['Alfred', 'Jeeves', 'Charles'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-3', "In 'Married... with Children', what is Al Bundy's job?", 'Shoe salesman', ['Car salesman', 'Insurance agent', 'Accountant'], 'Family Sitcoms'),
  createQuestion('sitcom-4', "What show features the Huxtable family?", 'The Cosby Show', ['Family Matters', 'A Different World', 'The Fresh Prince'], 'Family Sitcoms'),
  createQuestion('sitcom-5', "In 'The Brady Bunch', how many kids are there total?", '6', ['4', '5', '8'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-6', "Who plays the dad in 'Home Improvement'?", 'Tim Allen', ['Bob Saget', 'Patrick Duffy', 'John Ritter'], 'Family Sitcoms'),
  createQuestion('sitcom-7', "What is Steve Urkel's catchphrase in 'Family Matters'?", 'Did I do that?', ['How rude!', 'Cut it out!', 'You got it, dude!'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-8', "In 'Step by Step', what are the two families' last names?", 'Foster and Lambert', ['Smith and Jones', 'Brown and Davis', 'Miller and Wilson'], 'Family Sitcoms'),
  createQuestion('sitcom-9', "What is the name of the youngest daughter in 'Full House'?", 'Michelle', ['Stephanie', 'D.J.', 'Kimmy'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-10', "Who plays Will Smith in 'Fresh Prince of Bel-Air'?", 'Will Smith', ['Alfonso Ribeiro', 'DJ Jazzy Jeff', 'Tatyana Ali'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-11', "What is Uncle Phil's profession in 'Fresh Prince of Bel-Air'?", 'Judge', ['Lawyer', 'Doctor', 'Businessman'], 'Family Sitcoms'),
  createQuestion('sitcom-12', "In 'Growing Pains', what is the dad's profession?", 'Psychiatrist', ['Doctor', 'Lawyer', 'Teacher'], 'Family Sitcoms'),
  createQuestion('sitcom-13', "What catchphrase is Stephanie known for in 'Full House'?", 'How rude!', ['Did I do that?', 'You got it, dude!', 'Cut it out!'], 'Family Sitcoms'),
  createQuestion('sitcom-14', "In 'Roseanne', what is the family's last name?", 'Conner', ['Arnold', 'Cooper', 'Johnson'], 'Family Sitcoms'),
  createQuestion('sitcom-15', "What show features the Banks family?", 'Fresh Prince of Bel-Air', ['The Cosby Show', 'Family Matters', 'The Jeffersons'], 'Family Sitcoms'),
  createQuestion('sitcom-16', "In 'Home Improvement', what is the name of Tim's show?", 'Tool Time', ['Fix It Up', 'Hammer Time', 'Build It'], 'Family Sitcoms'),
  createQuestion('sitcom-17', "Who is the annoying neighbor in 'Family Matters'?", 'Steve Urkel', ['Wilson', 'Newman', 'Kramer'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-18', "What is Carlton's signature dance in 'Fresh Prince'?", 'The Carlton', ['The Robot', 'The Moonwalk', 'The Running Man'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-19', "In 'Full House', what is Joey's career?", 'Comedian', ['Actor', 'Musician', 'Writer'], 'Family Sitcoms'),
  createQuestion('sitcom-20', "What show features the Winslow family?", 'Family Matters', ['The Fresh Prince', 'Full House', 'The Cosby Show'], 'Family Sitcoms'),
  createQuestion('sitcom-21', "Who is the oldest sister in 'Full House'?", 'D.J.', ['Stephanie', 'Michelle', 'Kimmy'], 'Family Sitcoms', 'easy'),
  createQuestion('sitcom-22', "In 'Married... with Children', what is the name of the Bundy's dog?", 'Buck', ['Spot', 'Rex', 'Buddy'], 'Family Sitcoms'),
  createQuestion('sitcom-23', "What is the neighbor's name who you never fully see in 'Home Improvement'?", 'Wilson', ['Tim', 'Al', 'Brad'], 'Family Sitcoms'),
  createQuestion('sitcom-24', "In 'The Brady Bunch', what is the housekeeper's name?", 'Alice', ['Carol', 'Marcia', 'Jan'], 'Family Sitcoms'),
  createQuestion('sitcom-25', "What song is the theme for 'Fresh Prince of Bel-Air'?", 'Fresh Prince of Bel-Air', ['Parents Just Don\'t Understand', 'Summertime', 'Boom! Shake the Room'], 'Family Sitcoms', 'easy'),
];

// ========== REALITY TV ==========
export const REALITY_TV_QUESTIONS: Question[] = [
  createQuestion('reality-1', "What is the final challenge in 'Survivor' usually for?", 'Immunity', ['Money', 'Food', 'A car'], 'Reality TV'),
  createQuestion('reality-2', "Who was the first winner of 'American Idol'?", 'Kelly Clarkson', ['Carrie Underwood', 'Ruben Studdard', 'Fantasia Barrino'], 'Reality TV', 'easy'),
  createQuestion('reality-3', "What do contestants receive on 'The Bachelor'?", 'A rose', ['A ring', 'A key', 'A necklace'], 'Reality TV', 'easy'),
  createQuestion('reality-4', "What show features the phrase 'You're fired!'?", 'The Apprentice', ['Shark Tank', 'Undercover Boss', 'Kitchen Nightmares'], 'Reality TV', 'easy'),
  createQuestion('reality-5', "What cooking competition is hosted by Gordon Ramsay?", "Hell's Kitchen", ['Top Chef', 'MasterChef', 'Chopped'], 'Reality TV'),
  createQuestion('reality-6', "What show features drag queens competing?", "RuPaul's Drag Race", ['Project Runway', 'America\'s Next Top Model', 'Face Off'], 'Reality TV'),
  createQuestion('reality-7', "In 'Survivor', what is the location of the first season?", 'Borneo', ['Africa', 'Australia', 'Thailand'], 'Reality TV'),
  createQuestion('reality-8', "What family stars in 'Keeping Up with the Kardashians'?", 'Kardashian-Jenner', ['Hilton', 'Osbourne', 'Odom'], 'Reality TV', 'easy'),
  createQuestion('reality-9', "What dating show features people in pods?", 'Love Is Blind', ['The Bachelor', 'Dating Around', 'Too Hot to Handle'], 'Reality TV'),
  createQuestion('reality-10', "Who is the host of 'Survivor'?", 'Jeff Probst', ['Phil Keoghan', 'Ryan Seacrest', 'Chris Harrison'], 'Reality TV'),
  createQuestion('reality-11', "What show features entrepreneurs pitching to investors?", 'Shark Tank', ['The Apprentice', 'Undercover Boss', 'The Profit'], 'Reality TV'),
  createQuestion('reality-12', "What is the prize on 'The Amazing Race'?", '1 million dollars', ['500,000 dollars', '100,000 dollars', 'A trip around the world'], 'Reality TV'),
  createQuestion('reality-13', "What show made Simon Cowell famous in America?", 'American Idol', ['The X Factor', 'America\'s Got Talent', 'Britain\'s Got Talent'], 'Reality TV'),
  createQuestion('reality-14', "In 'Big Brother', what do houseguests compete for?", 'Head of Household', ['Golden Key', 'Immunity Idol', 'Power of Veto'], 'Reality TV'),
  createQuestion('reality-15', "What show features Ty Pennington building houses?", 'Extreme Makeover: Home Edition', ['This Old House', 'Fixer Upper', 'Property Brothers'], 'Reality TV'),
  createQuestion('reality-16', "Who hosted 'Fear Factor'?", 'Joe Rogan', ['Jeff Probst', 'Ryan Seacrest', 'Chris Hardwick'], 'Reality TV'),
  createQuestion('reality-17', "What cooking show has 'Mystery Basket' challenges?", 'Chopped', ['Iron Chef', 'Top Chef', 'MasterChef'], 'Reality TV'),
  createQuestion('reality-18', "What is the final tribal council vote for in 'Survivor'?", 'Sole Survivor (Winner)', ['Immunity', 'Reward', 'Exile'], 'Reality TV'),
  createQuestion('reality-19', "What show features home renovations by Chip and Joanna Gaines?", 'Fixer Upper', ['Property Brothers', 'Love It or List It', 'Flip or Flop'], 'Reality TV'),
  createQuestion('reality-20', "Who says 'The tribe has spoken' on 'Survivor'?", 'Jeff Probst', ['The host', 'The winner', 'The jury'], 'Reality TV'),
  createQuestion('reality-21', "What show features tattoo artists competing?", 'Ink Master', ['Miami Ink', 'LA Ink', 'Tattoo Fixers'], 'Reality TV'),
  createQuestion('reality-22', "In 'The Voice', what do coaches press to choose a contestant?", 'A button (to turn their chair)', ['A buzzer', 'A bell', 'A gong'], 'Reality TV', 'easy'),
  createQuestion('reality-23', "What is the main prize on 'American Idol'?", 'A record deal', ['1 million dollars', 'A car', 'A house'], 'Reality TV'),
  createQuestion('reality-24', "What reality show features dance competitions?", 'Dancing with the Stars', ['So You Think You Can Dance', 'America\'s Best Dance Crew', 'World of Dance'], 'Reality TV'),
  createQuestion('reality-25', "Who created 'Survivor'?", 'Mark Burnett', ['Simon Cowell', 'Ryan Seacrest', 'Jeff Probst'], 'Reality TV', 'hard'),
];

// ========== GET QUESTIONS FOR GENRE ==========
export function getQuestionsForGenre(genre: Genre): Question[] {
  let questions: Question[];

  switch (genre) {
    case 'eighties_music':
      questions = [...EIGHTIES_MUSIC_QUESTIONS];
      break;
    case 'nineties_music':
      questions = [...NINETIES_MUSIC_QUESTIONS];
      break;
    case 'two_thousands_music':
      questions = [...TWO_THOUSANDS_MUSIC_QUESTIONS];
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
    case 'disney_movies':
      questions = [...DISNEY_MOVIES_QUESTIONS];
      break;
    case 'sports_legends':
      questions = [...SPORTS_LEGENDS_QUESTIONS];
      break;
    case 'food_drinks':
      questions = [...FOOD_DRINKS_QUESTIONS];
      break;
    case 'cartoons':
      questions = [...CARTOONS_QUESTIONS];
      break;
    case 'video_games':
      questions = [...VIDEO_GAMES_QUESTIONS];
      break;
    case 'world_geography':
      questions = [...WORLD_GEOGRAPHY_QUESTIONS];
      break;
    case 'family_sitcoms':
      questions = [...FAMILY_SITCOMS_QUESTIONS];
      break;
    case 'reality_tv':
      questions = [...REALITY_TV_QUESTIONS];
      break;
    case 'mix_it_up':
      // Mix questions from all categories
      const all = [
        ...shuffleArray(EIGHTIES_MUSIC_QUESTIONS).slice(0, 2),
        ...shuffleArray(NINETIES_MUSIC_QUESTIONS).slice(0, 2),
        ...shuffleArray(TWO_THOUSANDS_MUSIC_QUESTIONS).slice(0, 1),
        ...shuffleArray(TV_SHOWS_QUESTIONS).slice(0, 2),
        ...shuffleArray(CLASSIC_MOVIES_QUESTIONS).slice(0, 2),
        ...shuffleArray(HOLIDAY_MOVIES_QUESTIONS).slice(0, 2),
        ...shuffleArray(DISNEY_MOVIES_QUESTIONS).slice(0, 2),
        ...shuffleArray(SPORTS_LEGENDS_QUESTIONS).slice(0, 1),
        ...shuffleArray(FOOD_DRINKS_QUESTIONS).slice(0, 1),
        ...shuffleArray(CARTOONS_QUESTIONS).slice(0, 2),
        ...shuffleArray(VIDEO_GAMES_QUESTIONS).slice(0, 1),
        ...shuffleArray(WORLD_GEOGRAPHY_QUESTIONS).slice(0, 1),
        ...shuffleArray(FAMILY_SITCOMS_QUESTIONS).slice(0, 1),
        ...shuffleArray(REALITY_TV_QUESTIONS).slice(0, 1),
      ];
      questions = shuffleArray(all);
      break;
    default:
      questions = [...EIGHTIES_MUSIC_QUESTIONS];
  }

  // Shuffle and return 20 questions
  return shuffleArray(questions).slice(0, 20);
}
