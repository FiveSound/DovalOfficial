import { ReportOption } from '.';

const initialOptions: ReportOption[] = [
  {
    id: '1',
    title: 'Inappropriate Content',
    subtitle:
      'Videos containing offensive language, disturbing images, or any content considered inappropriate.',
    checked: false,
  },
  {
    id: '2',
    title: 'Violence or Dangerous Behavior',
    subtitle:
      'Videos showing acts of violence, abuse, or any dangerous activity that may be harmful.',
    checked: false,
  },
  {
    id: '3',
    title: 'Discrimination or Hate Speech',
    subtitle:
      'Videos promoting hate or discrimination against individuals or groups based on race, religion, gender, etc.',
    checked: false,
  },
  {
    id: '4',
    title: 'Sexually Explicit Content',
    subtitle:
      'Videos containing nudity, sexual acts, or sexually explicit content.',
    checked: false,
  },
  {
    id: '5',
    title: 'Spam or Misleading Content',
    subtitle:
      'Videos containing spam, unrelated content, or misleading information intended to deceive users.',
    checked: false,
  },
  {
    id: '6',
    title: 'Copyright Infringement',
    subtitle:
      'Videos using content without the owner’s permission, including unauthorized reproduction of copyrighted material.',
    checked: false,
  },
  {
    id: '7',
    title: 'Threats or Harassment',
    subtitle:
      'Videos containing threats, harassment, or intimidation towards individuals or groups.',
    checked: false,
  },
  {
    id: '8',
    title: 'False or Misleading Information',
    subtitle:
      'Videos spreading false information, rumors, or misleading content that may cause confusion.',
    checked: false,
  },
  {
    id: '9',
    title: 'Incitement to Hate or Violence',
    subtitle:
      'Videos inciting hate, violence, or illegal actions against specific individuals or groups.',
    checked: false,
  },
  {
    id: '10',
    title: 'Privacy Violation',
    subtitle:
      'Videos disclosing personal or private information of individuals without consent.',
    checked: false,
  },
  {
    id: '11',
    title: 'Inappropriate Content for Minors',
    subtitle:
      'Videos unsuitable for minors, including graphic, violent, or explicit content.',
    checked: false,
  },
  {
    id: '12',
    title: 'Other Violations of Community Guidelines',
    subtitle:
      'Any other content violating the community guidelines and policies of the platform.',
    checked: false,
  },
];

export { initialOptions };
