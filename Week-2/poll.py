import json

# Question 1
def load_fps(filepath):
    polls_data = []
    with open(filepath, "r") as f:
        for line in f.readlines()[1:]:
            d = dict()
            question, options, votes, tags = line.split("::")
            options = [s.strip() for s in options.split("|")]
            optionVotes = [int(l.strip()) for l in votes.split("|")] 
            optionAndVotes = dict(zip(options, optionVotes))
            tagsList = [s.strip() for s in tags.split("|")]
            d["Question"] = question.strip()
            d["OptionVote"] = optionAndVotes
            d["Tags"] = tagsList
            polls_data.append(d)
    return polls_data

print("\n \nQuestion 1:-\n")
polls_data = load_fps("polldata.fps")
print(polls_data)


# Question 2
def filter_by_tags(polls_data, list_of_tags):
    filtered_data = []
    for poll in polls_data:
        tags = poll['Tags']
        if any(tag in tags for tag in list_of_tags):
            filtered_data.append(poll)
    return filtered_data

print("\n \nQuestion 2:-\n")
filtered_data = filter_by_tags(polls_data, ["cricket", "location"])
print(filtered_data)
print("\n")


# Question 3
def view_poll(polls_data, pollNumber):
    if pollNumber < 1 or pollNumber > len(polls_data):
        print("Invalid poll number.")
        return
    poll = polls_data[pollNumber - 1]
    question = poll['Question']
    option_vote = poll['OptionVote']
    tags = poll['Tags']
    print(question)
    for option, vote in option_vote.items():
        print(f"* {option}: {vote}")
    print("\nTags:", ", ".join(tags))

print("\n \nQuestion 3:-\n")
view_poll(polls_data, 5)
# view_poll(polls_data, 5)


# Question 5
def save_poll(polls_data, filepath):
    with open(filepath, "w+") as f:
        f.write("Question :: Options :: Votes :: Tags \n")
        for dictionary in polls_data:

            f.write(dictionary['Question'] + " :: ")
            f.write(" | ".join([s for s in dictionary["OptionVote"].keys()]) + " :: ")
            f.write(" | ".join([str(s) for s in dictionary["OptionVote"].values()]) + " :: ")
            f.write(" | ".join([s for s in dictionary["Tags"]]) + "\n")
            


# Question 4
def update_poll(polls_data, pollNumber, optionName):
    if 1 <= pollNumber <= len(polls_data):
        polls_data[pollNumber - 1]["OptionVote"][optionName] += 1 
    save_poll(polls_data, "updated_polldata.fps")
    return polls_data

print("\n \nQuestion 4:-\n")
update_poll_data = update_poll(polls_data, 4, "puma")
print(update_poll_data)


save_poll(update_poll_data, "updated_polldata.fps")
