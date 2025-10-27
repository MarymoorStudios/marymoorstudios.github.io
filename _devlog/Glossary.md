---
order: 1
title: "Glossary"
bg: white
color: black
excerpt: "Glossary of terms."
hideDate: "true"
---
## Glossary
The following contains a glossary of terms used in the documentation and other devlog entries.

### Terms:

#### **Activity**
A logical thread of execution.  An activity is a logical representation of a single-threaded sequential flow of control
within a larger program.  Programs can be a single activity but are usually comprised of more than one. Activities can
form a hierarchy with parent activities creating one or more child activities.  Activities can also spawn sibling
activities (this is less common).

We prefer the term "activity" to the more ambiguous term "thread" for two reasons: 

1. It better encompasses both cooperative, software-scheduled, and memory-disconnected activities like those implemented
by Tasks, goroutines, p-threads in addition to the more traditional physical-thread abstractions that imply a contiguous
stack with memory locality.

2. It avoids confusion with other ubiquitous extant abstractions that are already named "Thread" in almost all libraries
and frameworks.  Saying "Thread" may confuse the reader into adopting assumptions about the specific implementation
based on their experience with these previously existing abstractions. For example, the class
[System.Threading.Thread](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread) provides just such an
abstraction in the C# Language Runtime.  A "Thread" class can be _one of the ways_ to implement an activity, but it is
not the _only way_.

#### **Arrival Order**
In a message passing system, the order in which a sequence of messages arrive at their target.  In an RPC system built
on message passing, the arrival order is generally related to (but may not be the same as) the [Dispatch
Order](#dispatch-order).  As with [Send Order](#send-order), some RPC systems may perform queuing, have parallel
dispatch queues, read multiple simultaneous channels (e.g. sockets), or other internal design choices that lead the
actual dispatch order to be different than the arrival order.

#### **Call Order**
The order in which a sequence of methods (usually RPC methods) are called.  This represent the logical or sequential
order the caller would _normally expect_ their effects to be applied.  Because asynchronous methods, once started, may
run interleaved with subsequent but concurrent methods, the actual order of the applied effects in practice may not
match the call order.  The distributed computing notion of _serializability_ describes the relationship between the call
order and the order of applied effects (commit order).  In a system with true parallelism, multiple calls may be made
simultaenously, in which case the call order is only a partial order.

#### **Bearer Token**
A cryptographic or pseudo-random token that grants access to some resource simply by being presented without any strong
verification of the presenter's identity.  The name refers to the fact that access it granted to whomever bears (i.e.
carries or holds) the token.  A bearer token can easily be transferred allowing access delegation to a third party
without requiring additional communication.

#### **Caller (RPC)**
The sender of a message.

#### **Callee (RPC)**
The receiver of a message.

#### **Capability**
A communicable, unforgeable, reference to a (possibly remote) object along with an associated set of access rights.

#### **Capability Exchange**
A feature of a message passing system that allows capabilities to be passed in the payload of a message (including
response messages).

#### **Capability Revocation**
When a capability is revoked the access rights it formerly granted are removed.  Subsequent attempts to use a revoked
capability will fail.  Revocation is a terminal state for a capability.  Once revoked a capability cannot be restored,
and instead a new capability must be acquired.  Capabilities are typically revoked automatically when any session they
span is terminated, but may also be revoked explicitly.

#### **Commit Order**
In a distributed system, the order in which the applied effects of a sequence of operations are externalized (i.e. made
visible externally).  See also [Retirement Order](#retirement-order).

#### **Completion Order**
The order in which the results from a sequence of methods (usually RPC methods) is consumed.  This represent the logical
order the caller observes the outcome of the methods (but not necessary the order in which the methods applied their
effects).  In the synchronous case (or the asynchronous case where each method is immediately awaited in sequence) the
completion order matches the [Call Order](#call-order).  But, if async methods are allowed to executed concurrently
their outcomes may be observed out of order.  In a promise-based system where the outcome is represented as a
first-class object (e.g. a promise, a future, a task), the caller has the option to observe the outcomes in any order,
or even to pass the promise to another party for later observation.  In some async systems a pending async operation may
not be considered truly complete until its outcome has been observed, and failing to observe a completed outcome can
lead to leaks (or even early termination of the async operation due to garbage collection!).

#### **Dispatch Order**
In an RPC system, the order in which the handlers for a sequence of messages is _first_ dispatched at the callee.  Not
all message passing systems guaranteed in-order delivery of messages.  So the send order may NOT be the same as the
arrival order.  Unless the RPC system ensures or recovers the [Call Order](#call-order), the dispatch order may NOT be
the same as the original call order.  Some RPC systems perform parallel dispatch, with multiple dispatches occurring
simultaneously, in which case the dispatch order is only a partial order.

#### **Distributed System**
A system with multiple independent concurrent activities which communicate with each other by message passing so as to
coordinate their operation to achieve a higher goal.

#### **Distributed Computing**
The field of computer science dedicated to the design, development and understanding of distributed systems.

#### **Deterministic**
Something that produces the same outcome given the same inputs.

Deterministic software is much easier to write and test because its behavior is repeatable and predicable.  It exhibits
the same behavior during every execution.

#### **Eventual Value**
Sometimes called a **Promise**, a **Future**, a **Task**, or a **Proxy**.  Any of several kinds of values representing
the result of a future computation that will eventually complete, including:

* **Void Promises:**  
  Track the completion of an activity.  They have only a `void` value, but may resolve to an error if the computation
  failed.
* **Data Promises:**  
  Track the completion of an activity and resolve to a data value that the computation produces as its return value. May
  resolve to an error if the computation failed to produce a result.
* **Proxy:**  
  Track the completion of an activity producing a capability and provide access to the methods of that capability.  

#### **Global Reasoning**
When you have to think globally about the entire program (or a large portion of it) when deciding if the logic in the
program is correct.  Contrast with [Local Reasoning](#local-reasoning).

#### **Happens Before**
Defines a partial ordering of events across multiple [SIPs](#sip).  An event `A` can be said to _happen-before_ another
event `B` if:
  * **Same SIP Rule:** `A` and `B` occur in the same SIP, and `A` occurs before `B`.
  * **Message Passing Rule:** `A` is the sending of a message, and `B` is the receipt of _that_ message.
  * **Transitivity Rule:** If `A` _happens-before_ `B` and `B` _happens-before_ `C` then `A` _happens-before_ `C`.

The _happens-before_ relation itself does not imply causality, but it does provide the _possibility of causality_.  In a
causually consistent system it is generally necessary to _take into account the effects of_ any event `A` that _happened
before_ a given event `B` unless it can be proven that `A` and `B` are independent.

#### **Instance Order Constraint**
An ordering constraint that dictates that call order will match dispatch order for all calls made on the _same proxy
instance_.

#### **Interleaving**
A unique sequence of turns executed by a scheduler.  An interleaving is always a total order of the actual set of turns
that were executed.  An interleaving only captures the sequence of operations on a single logical vCore.  There can be
no specific total order across the set of interleavings spanning all of the vCores in a multicore system because some of
the operations happen simultaneously.  A partial order that is essentially a merge of multiple core-specific
interleavings _can_ be specified.

#### **Linear Transfer**
A linear transfer (in the ownership sense) refers to a model of exclusive memory access transfer, where a resource (such
as a memory region, pointer, or capability) is handed from one entity (sender) to another (recipient) in such a way that
the recipient gains access only if the sender simultaneously relinquishes it. This ensures there is never more than one
valid owner at a time, preventing aliasing and race conditions.

#### **Linear Type**
A type whose implementation in the type system guarantees that all instance references can ONLY be exchanged through a
[Linear Transfer](#linear-transfer).  The in-memory state of a linear type is therefore guaranteed to have exactly one
owner (with no aliasing) throughout its lifetime.

#### **Local Reasoning**
When you only have to look at a small subset of the program to determine if that _part_ of the program is correct.
Contrast with [Global Reasoning](#global-reasoning).

#### **Nondeterministic**
Something that may produce different outcomes even with the same inputs due to factors other than the inputs.

Nondeterministic softwware can be harder to write and test because it exhibits different behavior during each execution.
Most software has some sources of nondeterminism, but it is a good practice to limit the sources of nondeterminism and
to control the points in the software where they can introduce behavior variability.  This practice helps isolate
variability to well known components making the remaining portions of the software easier to write and test.

#### **Pipelining**
To issue multiple _ordered_ requests without waiting for the previous ones to complete.  We distinguish pipelined
requests from parallel requests (both of which represent kinds concurrent requests) in that pipelined requests maintain
an explicit ordering (a sequence) while parallel requests have no such ordering.  Batching is also a related concepted,
but batching deals more with the _framing_ around mutiple requests than with their ordering or concurrency semantics;
depending on the specific API, a single batch may be ordered or unordered, and may execute sequentially, concurrently,
or even in parallel.

#### **Promise**
See [Eventual Value](#eventual value).

#### **Proxy**
See [Eventual Value](#eventual value).

#### **Retirement Order**
In an RPC system, the order in which responses are sent for a sequence of methods that are resolved at the callee.  In a
distributed system this is closely related to the [Commit Order](#commit-order).  The retirement of a method completes
the callee's burden for handling the message, and all callee-side resources can be released.  The retirement rate
(retirements per second for a given dispatch rate) is often a good metric of server efficiency.  In a system with true
parallelism, multiple handlers may run simultaenously, in which case the retirement order is only a partial order.

#### **Root Capability**
The first capability received when successfully initiating a new connected session.  The root capability is made
available directly as a result of session establishment and doesn't require any additional method to be called.  This is
the ONLY capability that is delivered without a method call.  All other reachable capabilities MUST be obtained through
some sequence of calls to either the root capability or another capability returned directly or indirectly from the
root.  Each party exports their own root capability to the opposite party in a bidrectional session.  Either party may
export the `Nothing` capability if _no actions are authorized_ in that direction.

#### **Scheduler**
Something that decides which activity to execute next.  If there is only a single runnable activity then the choice is
obvious.  When there are multiple runnable activities then the scheduler will use a _scheduling algorithm_ (or
_scheduling policy_) to determine which actitivity to run next.  The scheduler continues to make activity choices at
each turn boundary until either: (1) all activities terminate (which ends the computation), or (2) external termination
signals the scheduler to stop (such as process termination).

#### **Send Order**
In a message passing system, the order in which a sequence of messages are sent.  In an RPC system built on message
passing, the [Call Order](#call-order) is generally related to (but may not be the same as) the send order.  Some RPC
systems may perform queuing, have parallel send queues, use multiple simultaneous channels (e.g. sockets), or other
internal design choices that lead the actual send order to be different than the original call order.  See also [Arrival
Order](#arrival-order).

#### **Server Push**
A feature of some message passing and communication systems that allows the server to send data to the client without
the client first making an explicit request for it.  Server push aims to reduce network latency (and network
utilization) by allowing the server to send data preemptively that the server anticipates the client will need.  When
coupled with server-side [Pipelining](#pipelining), overall latency for a complex, multipart interaction can be
dramatically reduced.

#### **Session Layer**
A session defines the logical protocol for communication.  It is responsible for designating the structure of messages,
the format of message serialization, and the semantics of message exchange.  It is also responsible for authentication,
versioning, and configuration negotiations.  Sessions and their semantics implement the logic of a message passing
system.

#### **SIP**
See [Software Isolated Process](#software-isolated-process).

#### **Software Isolated Process**
A single-threaded, sequential, logical thread of execution with _exclusive_ access to its own isolated memory.  A
Software Isolated Process (or SIP) meets the definition of "process" according to Tony Hoare's theory of Communicating
Sequential Processes (CSP).  A SIP also meets the defintion of "process" in Leslie Lamport's paper "Time, Clocks, and
the Ordering of Events in a Distributed System".  A SIP may be trivially defined by a straight-line synchronous program,
but is also satisfied by a system with multiple concurrent activites which are scheduled by a single-threaded
[Scheduler](#scheduler).

#### **Streaming**
Something that is produce or consumed incrementally.  A streaming network protocol might deliver a sequence of items
incrementally over time.  A streaming serialization might allow deserialization by reading the bytes from a file
incrementally starting at the top to the bottom.  A _key characteristic_ of streaming is that **the whole sequence never
needs to be present in memory at the same time**.  Instead a smaller, fixed, sliding window of items (maybe even a
single item) are made available at any given time before the streaming sequence is _moved forward_ to make room for the
next window of items.  Streaming sequences usually only move in a single (forward) direction, but some streaming
sequences can be restarted and read multiple times.

#### **TOCTOU**
Time of Check, Time of Use.  Refers to issues that arise when an invariant is checked (say, a member variable has a
particular value), the computation is interrupted (e.g. prempted, yields, awaits), the invariant is invalided by another
computation that runs during the interruption, the computation resumes, the computation makes decisions based on the
original value checked before the interruption even though the value has now changed.  

#### **Top of Turn**
A property of a computation such that no other application logic appears higher on the stack than the currently
executing stack frame.  The first stack frame entered by the Promise scheduler at the beginning of each new turn has
this property.  A computation with Top-of-Turn is guaranteed that it cannot be reentering another abstraction when
calling that abstractions methods because no other stack frames are executing above the current frame and so that
abstraction could **NOT** already have been entered higher up on the stack.  Reentrancy issues are very common when
multiple abstractions synchronously call between each other such that the callee then calls back into its caller.

For example, a common case for such issues occurs when an abstraction's method takes a functional closure as an argument
and then execute that closure in the middle of a method (an upcall).  It can be much easier to avoid reentrancy issues
that occur when abstractions make upcalls by scheduling such upcalls in a future turn (i.e. deferred execution) instead
of executing them directly in the middle of a method.  While in the middle of a method, an abstraction may have
temporarily violated its own invariants, which _will be_ reestablished in the normal course before the method ends.
However, if while in this state, the abstraction makes an upcall to caller controlled code which then calls back _into_
the abstraction from the outside, such reentrant calls may see the abstraction's invariants in a violated state.  An
abstraction could carefully restore invariants _before_ making the upcall, but that can be awkward to do.  Alternatively
by scheduling such an upcall in a future turn the abstraction has a more natural opportunity to restore its own
invariants _before_ the caller controlled code executes. Since the upcall then executes in a new turn which itself has
Top-of-Turn, no reentrancy occurs and no invariants are violated.

#### **Transport Layer**
A transport defines the mechanics of physically moving data between two endpoints across some medium.  It is usually
also responsible for data ordering, reliability and integrity.  Transports may be stateless or stateful, unreliable or
reliable, connectionless or connection-oriented, and unordered or ordered.  Transports can be nested, implementing a new
transport on top of another one.  Examples of common transports include UDP and TCP on the network, and shared-memory or
pipes between processes on the same machine.

#### **Turn**
A bounded, finite, prompt computation that forms part of a larger activity.  A turn ends when the computation either (1)
is preempted (say, by the scheduler), (2) yields on its own (say, as part of cooperative scheduling), (3) awaits on an
awaitable (such as on IO, a Promise, or a Task), or (4) terminates (say, because it has completed it work).  

## Feedback
Write us with [feedback][feedback].

## See Also
* [All Posts][all-posts]
* [MSC (Marymoor Studios Core libraries)][MSC]

[MSC]: https://github.com/MarymoorStudios/Core
[all-posts]: /devlog.html
[feedback]: mailto:feedback@marymoorstudios.com
