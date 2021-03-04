<?php
require_once("storage.php");
$storage = new JSONStorage("add.json"); //new Storage(new JsonIO("path/to/file.json"))
$appointments = $storage->findAll();
/*$appointments = [
  'appid040' => [
    'id' => 'appid3',
    'time' => '2021-01-04 15:00',
    'slots' => 1,
    'users' => [
      'userid3',
    ],
  ],
  'appid041' => [
    'id' => 'appid4',
    'time' => '2021-01-04 17:00',
    'slots' => 2,
    'users' => [
      'userid3',
    ],
  ],
  'appid050' => [
    'id' => 'appid5',
    'time' => '2021-01-05 12:00',
    'slots' => 1,
    'users' => [
      'userid4',
    ],
  ],
  'appid060' => [
    'id' => 'appid6',
    'time' => '2021-01-06 11:00',
    'slots' => 3,
    'users' => [
      'userid1',
    ],
  ],
  'appid070' => [
    'id' => 'appid7',
    'time' => '2021-01-07 19:00',
    'slots' => 1,
    'users' => [
      'userid2',
    ],
  ],
  'appid080' => [
    'id' => 'appid8',
    'time' => '2021-01-08 16:00',
    'slots' => 1,
    'users' => [
      'userid5',
    ],
  ],
  'appid090' => [
      'id' => 'appid9',
      'time' => '2021-01-09 15:00',
      'slots' => 1,
      'users' => [
        
      ],
  ],
  'appid0100' => [
    'id' => 'appid10',
    'time' => '2021-01-10 12:00',
    'slots' => 3,
    'users' => [
      
    ],
  ],
  'appid0110' => [
    'id' => 'appid11',
    'time' => '2021-01-11 11:00',
    'slots' => 4,
    'users' => [
      
    ],
  ],
  'appid0120' => [
    'id' => 'appid12',
    'time' => '2021-01-12 19:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0130' => [
    'id' => 'appid13',
    'time' => '2021-01-13 16:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0140' => [
      'id' => 'appid14',
      'time' => '2021-01-14 15:00',
      'slots' => 1,
      'users' => [
        
      ],
  ],
  'appid0150' => [
    'id' => 'appid15',
    'time' => '2021-01-15 12:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0160' => [
    'id' => 'appid16',
    'time' => '2021-01-16 11:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0170' => [
    'id' => 'appid17',
    'time' => '2021-01-17 19:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0180' => [
    'id' => 'appid18',
    'time' => '2021-01-18 16:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0190' => [
      'id' => 'appid19',
      'time' => '2021-01-19 15:00',
      'slots' => 1,
      'users' => [
        
      ],
  ],
  'appid0200' => [
    'id' => 'appid20',
    'time' => '2021-01-20 12:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0210' => [
    'id' => 'appid21',
    'time' => '2021-01-21 11:00',
    'slots' => 2,
    'users' => [
      
    ],
  ],
  'appid0220' => [
    'id' => 'appid22',
    'time' => '2021-01-22 19:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0230' => [
    'id' => 'appid23',
    'time' => '2021-01-23 16:00',
    'slots' => 1,
    'users' => [
      
    ],
  ],
  'appid0240' => [
      'id' => 'appid24',
      'time' => '2021-01-24 16:00',
      'slots' => 2,
      'users' => [
        
      ],
  ],
  'appid0250' => [
      'id' => 'appid25',
      'time' => '2021-01-25 12:00',
      'slots' => 3,
      'users' => [
        
      ],
  ],
  'appid0260' => [
      'id' => 'appid26',
      'time' => '2021-01-26 19:00',
      'slots' => 1,
      'users' => [
        
      ],
  ],
  'appid0270' => [
      'id' => 'appid27',
      'time' => '2021-01-27 15:00',
      'slots' => 2,
      'users' => [
        
      ],
  ],
];*/

echo json_encode($appointments);
?>