export const listConfigurations = [
    {
      listName: 'Users',
      columns: [
        { name: 'Country', type: 'Text' },
        { name: 'Email', type: 'Text' }
      ],
      Record: [
            
      ],
    },
    {
      listName: 'Questions',
      columns: [
      ],
      Record: [
        { Title: 'What is the capital of France?'},
        { Title: 'What is the largest planet in our solar system?'},
        { Title: 'What is the tallest mountain in the world?'},
        { Title: 'Who is President of USA?'},
        { Title: 'Indian Currency?'},
        { Title: 'How many states in USA?'}
      ],
    },
    {
      listName: 'Answers',
      columns: [
        { name: 'Question', type: 'Lookup', lookupList: 'Questions', lookupField: 'Title' },
        { name: 'OptionA', type: 'Text' },
        { name: 'OptionB', type: 'Text' },
        { name: 'OptionC', type: 'Text' },
        { name: 'OptionD', type: 'Text' },
        { name: 'RightOption', type: 'Text' }

      ],
      Record: [
        { QuestionId: 1, OptionA: 'Paris', OptionB: 'London', OptionC: 'Berlin', OptionD: 'Madrid', RightOption: 'Paris' },
        { QuestionId: 2, OptionA: 'Mars', OptionB: 'Saturn', OptionC: 'Jupiter', OptionD: 'Neptune', RightOption: 'Jupiter' },
        { QuestionId: 3, OptionA: 'K2', OptionB: 'Mount Everest', OptionC: 'Kangchenjunga', OptionD: 'Makalu', RightOption: 'Mount Everest' },
        { QuestionId: 4, OptionA: 'Ubama', OptionB: 'Putin', OptionC: 'Jeff Bezoz', OptionD: 'Donald Trump', RightOption: 'Donald Trump' },
        { QuestionId: 5, OptionA: 'Rupee', OptionB: 'Riyal', OptionC: 'Dollar', OptionD: 'Dinar', RightOption: 'Rupee' },
        { QuestionId: 6, OptionA: '51', OptionB: '52', OptionC: '60', OptionD: '44', RightOption: '52' }
      ],
    },
    {
      listName: 'User Responses',
      columns: [
        { name: 'UserSelection', type: 'Text' },
        { name: 'QuizID', type: 'Text' },
        { name: 'Right', type: 'Boolean' },
        { name: 'User', type: 'Lookup', lookupList: 'Users', lookupField: 'Email' },
        { name: 'Question', type: 'Lookup', lookupList: 'Questions', lookupField: 'Title' },
      ],
      Record: [
          
      ],
    },
    {
      listName: 'Quiz Reports',
      columns: [
        { name: 'QuizID', type: 'Text' },
        { name: 'TotalAttempt', type: 'Number' },
        { name: 'Score', type: 'Number' },
        { name: 'User', type: 'Lookup', lookupList: 'Users', lookupField: 'Email' },
      ],
      Record: [
          
      ],
    }
    

  ];