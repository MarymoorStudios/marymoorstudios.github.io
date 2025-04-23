---
order: 1
title: "Glossary"
date: 2025-04-10 12:00:00
bg: white
color: black
style: "left"
excerpt: "Glossary of terms."
featured: "false"
hideDate: "true"
---
## Glossary
The following contains a glossary of terms used in the documentation and blog entries.

### Terms:

#### **Activity**
A logical thread of execution.  An activity is a logical representation of a single-threaded sequential flow of control
within a larger program.  Programs can be a single activity but are usually comprised of more than one activity.
Activities can form a hierarchy with parent activities creating one or more child activities.  Activities can also spawn
sibling activities (though this is rare).

I prefer the term "activity" to the more ambiguous term "thread" for two reasons: 

1. It better encompasses both the cooperative, software-scheduled, and memory-disconnected activities like those
implemented by Tasks, goroutines, p-threads in addition to more traditional physical thread abstractions that imply a
contiguous stack with memory locality.  
2. It avoids confusion with other ubiquitous extent abstractions that are already named "Thread" in almost all libraries
and frameworks.  Saying "Thread" may confuse the reader into adopting assumptions about the specific implementation
based on their experience with these previously existing abstractions. For example, the class
[System.Threading.Thread](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread) provides just such an
abstraction in the C# Language Runtime.  A "Thread" class can be _one of the ways_ to implement an activity, but it is
not the _only way_.

#### **Deterministic**
Something that produces the same outcome given the same inputs.

Deterministic software is much easier to write and test because its behavior is repeatable and predicable.  It exhibits
the same behavior during every execution.

#### **Interleaving**
A unique sequence of turns executed by a scheduler.  An interleaving is always a total order of the actual set of turns
that were executed.  An interleaving only captures the sequence of operations on a single logical vCore.  There can be
no specific total across the set of interleavings spanning all of the vCores in a multicore system, as some of the
operation happen simultaneously, but a partial order could be specified.

#### **Nondeterministic**
Something that may produce different outcomes even with the same inputs due to factors beyond than the inputs.

Nondeterministic softwware can be harder to write and test because it exhibits different behavior during each execution.
Most software has some sources of nondeterminism, but it is a good principle to limit the sources of nondeterminism and
to control the points in the software where they can introduce variability.  This helps isolation that variability
making the remaining portions of the software easier to write and test.

#### **Scheduler**
Something that decides which activity to execute next.  If there is only a single runnable activity then the choice is
obvious.  When there are multiple runnable activities then the scheduler will use a _scheduling algorithm_ (or
_scheduling policy_) to determine which actitivity to choose next.  The scheduler continues to make activity choices at
each turn boundary until either: (1) all activities terminate (which ends the computation), or (2) external termination
signals the scheduler to stop (such as process termination).

#### **Top of Turn**
A property of a computation such that no other application logic appears higher on stack than the currently executing
stack frame.  The first stack frame entered by the Promise scheduler at the beginning of each new turn has this
property.  A computation with Top-of-Turn is guaranteed that it cannot be reentering another abstraction when calling
that abstractions methods because no other stack frames are executing above the current frame and so that abstraction
could **NOT** already have been entered higher up on the stack.  Reentrancy issues are very common when multiple
abstractions synchronously call between each other such that the callee then calls back into its caller.

For example, a common case for such issues occurs when an abstraction's method take a functional closure as an argument
and then execute that closure in the middle of a method (an upcall).  It can be much easier to avoid reentrancy issues
that occur when abstractions make upcalls by scheduling such upcalls in a future turn (i.e. deferred execution) instead
of executing them directly in the middle of a method.  While in the middle of a method, an abstraction may have
temporarily violated its own invariants, which _will be_ reestablished in the normal course before the method ends.
However, if while in this state, the abstraction makes an upcall to caller controlled code which then calls back _into_
the abstraction from the outside, such reentrant calls may see the abstraction's invariants in a violated state.  An
abstraction could carefully restore invariants _before_ making the upcall, but that can be awkward to do.  Alternatively
by scheduling such an upcall in a future turn the abstraction has a more natural opportunity to restore its own
invariants _before_ the caller controlled code executes. Since the upcall then executes in a new turn that is itself
Top-of-Turn, no reentrancy occurs and no invariants are violated.

#### **Turn**
An bounded, finite, prompt computation that forms part of a larger activity.  A turn ends when the computation is either
(1) interrupted (say, by the scheduler), (2) yields on its own (say, as part of cooperative scheduling), or (3) awaits
on an awaitable (such as on IO, a Promise, or a Task).  In a single-threaded, cooperative scheduling environment, such
as the Promise scheduler, a turn is NEVER interrupted.  This guarantees that invariants once established are never
_externally_ invalided unless the turn yields or awaits.  This property makes it _much_ easier to reason about TOCTOU
issues.
