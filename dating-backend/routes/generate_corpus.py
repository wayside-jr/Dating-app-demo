import random

# Categories of lines
greetings = [
    "Hello!", "Hi there!", "Hey!", "Greetings!", "Good day!", "Howdy!", "Hi!", "Heya!", "Yo!", "What's up?"
]

small_talk_questions = [
    "How are you?", "How's your day going?", "What are you up to?", "Anything exciting today?",
    "How have you been?", "Nice weather today?", "Did you watch any movies lately?",
    "What's your favorite food?", "Do you like traveling?", "Have you read any good books?"
]

small_talk_responses = [
    "I'm doing great, thank you!", "Pretty good!", "I had a busy day.", "Not much, just relaxing.",
    "I'm feeling awesome!", "Could be better.", "I just watched a great movie!", "I love pizza!",
    "Traveling is my passion.", "I recently finished a great book."
]

# Open corpus.txt for writing
with open("corpus.txt", "w", encoding="utf-8") as f:
    # Repeat many times to make thousands of lines
    for _ in range(1000):
        # Add greetings
        f.write(random.choice(greetings) + "\n")
        # Add small talk Q&A
        q = random.choice(small_talk_questions)
        a = random.choice(small_talk_responses)
        f.write(q + "\n")
        f.write(a + "\n")
        # Add some generic responses
        f.write("Tell me more about that.\n")
        f.write("That's interesting!\n")
        f.write("I see.\n")
        f.write("Really?\n")
        f.write("Wow!\n")
        f.write("Could you explain?\n")

print("✅ corpus.txt created with 1000+ lines of conversation!")
