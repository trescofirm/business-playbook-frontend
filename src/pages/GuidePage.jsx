import {
  Link,
  useParams,
} from "react-router-dom";

import { guides } from "../data/guides";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GUIDE_CONTENT = {
  "how-to-build-social-confidence": {
    intro:
      "Social confidence is not about becoming the loudest person in a room. It is about becoming more comfortable communicating, participating and connecting with other people.",

    sections: [
      {
        heading:
          "Start With Smaller Social Situations",

        paragraphs: [
          "Building social confidence becomes easier when you practice in situations that feel manageable rather than trying to change everything at once.",
          "Start by initiating short conversations, asking questions and becoming more comfortable being present around other people.",
        ],
      },

      {
        heading:
          "Focus on Communication Instead of Performance",

        paragraphs: [
          "Trying to impress everyone can make social situations feel more stressful. Instead, focus on listening, asking genuine questions and contributing naturally to the conversation.",
        ],
      },

      {
        heading:
          "Build Confidence Through Repeated Practice",

        paragraphs: [
          "Confidence generally becomes stronger through repeated experiences. Give yourself opportunities to interact with people, reflect on what worked and gradually take on situations that feel more challenging.",
        ],
      },
    ],

    actionSteps: [
      "Start one short conversation with someone you do not normally speak with.",
      "Ask at least one genuine follow-up question instead of planning your next response.",
      "After the interaction, write down one thing that went better than expected.",
    ],
  },

  "how-to-build-a-social-circle": {
    intro:
      "Building a social circle takes repeated interaction, shared interests and a willingness to initiate conversations and activities.",

    sections: [
      {
        heading:
          "Start With Existing Opportunities",

        paragraphs: [
          "Classes, clubs, hobbies, communities and recurring activities provide natural opportunities to meet the same people more than once.",
        ],
      },

      {
        heading:
          "Become Better at Starting Conversations",

        paragraphs: [
          "Simple questions about the activity, environment or shared interest can create natural openings without requiring a complicated conversation starter.",
        ],
      },

      {
        heading:
          "Prioritize Repeated Interaction",

        paragraphs: [
          "A social circle usually develops through repeated contact rather than a single successful conversation. Returning to the same activities gives relationships more opportunities to develop naturally.",
        ],
      },
    ],

    actionSteps: [
      "Choose one recurring activity or community where you can meet people regularly.",
      "Introduce yourself to one person and ask about a shared activity or interest.",
      "Return to the same environment instead of relying only on one-time social events.",
    ],
  },

  "how-to-reduce-phone-distractions": {
    intro:
      "Phones can interrupt focused work through notifications, social media, messages and habitual checking. Reducing these interruptions starts with changing the environment around your attention.",

    sections: [
      {
        heading:
          "Remove Unnecessary Notifications",

        paragraphs: [
          "Turn off notifications that are not important enough to interrupt your current task.",
        ],
      },

      {
        heading:
          "Create Phone-Free Focus Periods",

        paragraphs: [
          "During important work or study sessions, place your phone away from your immediate workspace and create a defined period for uninterrupted work.",
        ],
      },

      {
        heading:
          "Make Distracting Apps Less Convenient",

        paragraphs: [
          "Increase the friction around habitual checking by removing distracting apps from your home screen, logging out of unnecessary accounts or keeping the phone outside your immediate workspace.",
        ],
      },
    ],

    actionSteps: [
      "Turn off non-essential notifications on your phone.",
      "Choose one recurring period each day when your phone stays away from your workspace.",
      "Move your most distracting apps away from the home screen or remove them temporarily.",
    ],
  },

  "dopamine-detox-for-students": {
    intro:
      "A practical digital reset focuses on becoming more intentional about highly distracting digital habits rather than literally removing dopamine from the body.",

    sections: [
      {
        heading:
          "Identify Your Biggest Digital Distractions",

        paragraphs: [
          "Start by identifying the apps, websites and habits that most frequently interrupt studying or important work.",
        ],
      },

      {
        heading:
          "Build Clear Digital Boundaries",

        paragraphs: [
          "Set realistic limits around social media, entertainment and unnecessary phone use while protecting time for studying, rest and offline activities.",
        ],
      },

      {
        heading:
          "Replace the Habit Instead of Relying Only on Restriction",

        paragraphs: [
          "Removing a distracting activity becomes easier when you have something useful to replace it with. Reading, walking, exercising, studying or spending time with people can provide alternatives to habitual screen use.",
        ],
      },
    ],

    actionSteps: [
      "Identify the two digital activities that consume the most unnecessary time.",
      "Choose a specific period of the day for reduced social media and entertainment use.",
      "Prepare one offline activity you can turn to when you feel the urge to check your phone.",
    ],
  },

  "how-to-improve-focus-and-concentration": {
    intro:
      "Better focus starts with reducing unnecessary interruptions and creating an environment where sustained attention is easier to maintain.",

    sections: [
      {
        heading:
          "Reduce Context Switching",

        paragraphs: [
          "Switching repeatedly between tasks, messages and applications can make focused work more difficult. Give important tasks dedicated periods of attention.",
        ],
      },

      {
        heading:
          "Make the Task Easier to Start",

        paragraphs: [
          "Define the next concrete action before beginning a work session. A clear starting point reduces friction and makes it easier to begin.",
        ],
      },

      {
        heading:
          "Create a Consistent Focus Environment",

        paragraphs: [
          "Use a consistent workspace and remove predictable distractions before starting. The fewer decisions you need to make during a focus session, the easier it becomes to stay with the task.",
        ],
      },
    ],

    actionSteps: [
      "Choose one important task before starting your next work session.",
      "Write down the exact next action required to begin that task.",
      "Remove unnecessary notifications, tabs and devices before starting the session.",
    ],
  },

  "how-to-stop-multitasking": {
    intro:
      "Constantly switching between tasks can make it difficult to maintain sustained attention. A better approach is to decide what deserves your attention and protect that time.",

    sections: [
      {
        heading:
          "Choose One Primary Task",

        paragraphs: [
          "Before beginning a work session, decide which task deserves your primary attention and remove unnecessary sources of interruption.",
        ],
      },

      {
        heading:
          "Use Short Focused Work Periods",

        paragraphs: [
          "If long periods of concentration feel difficult, start with manageable focused sessions and gradually increase the duration.",
        ],
      },

      {
        heading:
          "Create a Simple Task Queue",

        paragraphs: [
          "Keep other tasks visible in a simple list instead of switching to them immediately. This lets you record competing priorities without allowing them to interrupt the task currently in progress.",
        ],
      },
    ],

    actionSteps: [
      "Choose one primary task for your next focused work period.",
      "Write other tasks down instead of switching to them immediately.",
      "Complete the current focus period before deciding whether to move to another task.",
    ],
  },
};

const GuidePage = () => {
  const { slug } = useParams();

  const guide = guides.find(
    (item) => item.slug === slug
  );

  if (!guide) {
    return null;
  }

  const content = GUIDE_CONTENT[slug];

  if (!content) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="guide-page">
        <article>
          <nav
            aria-label="Breadcrumb"
            className="breadcrumbs"
          >
            <Link to="/">
              Home
            </Link>

            <span aria-hidden="true">
              /
            </span>

            <Link to="/guides">
              Guides
            </Link>

            <span aria-hidden="true">
              /
            </span>

            <span>
              {guide.title}
            </span>
          </nav>

          <header>
            <p className="book-page-eyebrow">
              BUSINESS PLAYBOOK GUIDE
            </p>

            <h1>
              {guide.title}
            </h1>

            <p>
              {guide.description}
            </p>
          </header>

          <section>
            <h2>
              {guide.title}: A Practical Guide
            </h2>

            <p>
              {content.intro}
            </p>
          </section>

          {content.sections.map(
            (section) => (
              <section
                key={section.heading}
              >
                <h2>
                  {section.heading}
                </h2>

                {section.paragraphs.map(
                  (paragraph) => (
                    <p key={paragraph}>
                      {paragraph}
                    </p>
                  )
                )}
              </section>
            )
          )}

          <section>
            <h2>
              Practical Steps to Try
            </h2>

            <ol>
              {content.actionSteps.map(
                (step) => (
                  <li key={step}>
                    {step}
                  </li>
                )
              )}
            </ol>
          </section>

          <section>
            <h2>
              Continue Learning
            </h2>

            <p>
              If you want a more structured
              resource to continue working on
              this area, explore the related
              Business Playbook book.
            </p>

            <Link
              to={`/books/${guide.relatedBook}`}
            >
              Explore the related Business Playbook book
            </Link>
          </section>

          <section>
            <h2>
              Explore More Business Playbook Guides
            </h2>

            <nav aria-label="Related guides">
              <ul>
                {guides
                  .filter(
                    (item) =>
                      item.slug !== slug
                  )
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/guides/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default GuidePage;