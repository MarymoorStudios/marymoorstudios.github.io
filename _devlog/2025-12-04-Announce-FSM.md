---
order: 10
title: "Announce: MarymoorStudios.Core.Fsm"
date: 2025-12-04 10:00:00 -0700
bg: white
color: black
excerpt: "MarymoorStudios.Core.Fsm is generally available."
featured: "true"
---
# Announce: MarymoorStudios.Core.Fsm
--------

[MarymoorStudios.Core.Fsm][nuget-fsm] is a new MSC library for defining finite state machines:

* [API Documentation](_docfx/api/MarymoorStudios.Core.Fsm.html)
* [Samples](https://github.com/MarymoorStudios/Core/Samples/HsmSample)

## New C#-based language for defining FSMs
* Declarative FSM definitions using a C# fluent builder pattern.
* Input events are defined by methods signatures. Supports ad-hoc or interface-based input event definitions. 
* Simple [attribute] code-gen triggers. Generates state machine logic as nested classes within the user-defined class.
* Roslyn integrated incremental code-gen works in Visual Studio, VS Code, or any msbuild toolchain.
* Also generates [Mermaid State Diagrams](https://mermaid.js.org/syntax/stateDiagram.html) for visualization.

## Support Hierarchical State Machines (HSM)
* Like [Statecharts](https://statecharts.dev/) or the [State Pattern](https://en.wikipedia.org/wiki/State_pattern).
* Nested states inherit event handling from their parent (composite) states which significantly reduces clutter and
  improves  maintainability.
* Nest states to any degree.
* Support nested and global error handling to control transitions in the presence of errors.

## Advanced State Machine Features
* State transition validation.
* OnEnter and OnExit events.
* OnStart support for determining the starting state (of both the root machine and nested composites).
* Deferred input event dispatching prevents event handler reentrancy. Post input signals from within an event handler
  without reentering or corrupting state transition validation.

## Async Input Events
* Define async [Promise](https://marymoorstudios.com/_docfx/api/MarymoorStudios.Core.Promises.Promise.html)-based input
  events.
* Automatically produces input signals when async inputs complete (success or error).
* Automatic pending async input signal lifetime tracking with the ability to await on pending.
* Support for
  [IPromiseDisposable](https://marymoorstudios.com/_docfx/api/MarymoorStudios.Core.Promises.IPromiseDisposable.html) for
  HSMs with async inputs.

```cs
  [HsmInput]
  public override void Process(double delta)
  {
    m_state.Process(this, delta);
  }
  
  [HsmInput]
  public void See(Character target)
  {
    m_state.See(this, target);
  }
  
  [HsmInput]
  public override void TakeDamage(int damage)
  {
    m_state.TakeDamage(this, damage);
  }
  
  [HsmStates]
  private static void StateMachine(HsmMeta<Enemy, Hsm,   State, Inputs> m, Inputs i, Enemy x)
  {
    m.Composite(State.Init,
      [
        m.Composite(State.Alive,
          [
            m.State(State.Stunned)
             .OnEnter(x.StunnedOnEnter)
             .OnExit(x.StunnedOnExit)
             .Edge(i.Process, x.StunnedProcess, State. Self,  State.History),
            m.State(State.Idle)
             .OnEnter(x.IdleOnEnter)
             .Edge(i.Process, x.IdleProcess, State.Self,   State.Patrol),
            m.State(State.Patrol)
             .OnEnter(x.PatrolOnEnter)
             .Edge(i.Process, x.PatrolProcess, State.Self,   State.Idle),
            m.State(State.Attack)
             .OnEnter(x.AttackOnEnter)
             .Edge(i.Process, x.AttackProcess, State.Self,   State.Idle),
          ])
         .OnStart(State.Idle)
         .Edge(i.See, x.AliveSee, State.Self, State.Attack)
         .Edge(i.TakeDamage, x.AliveTakeDamage, State. Dead,  State.Stunned),
        m.State(State.Dead)
         .OnEnter(x.DeadOnEnter)
         .Edge(i.Process, x.DeadProcess),
      ])
     .OnStart(State.Alive);
  }
```

## Previous
Read the [previous post][devlog-post9] in this series.

## Next
Read the [next post][devlog-post11] in this series.

## Feedback
Write us with [feedback][feedback].

## See Also
* [All Posts][all-posts]
* [Glossary][glossary]
* [MSC (Marymoor Studios Core libraries)][MSC]

[MSC]: https://github.com/MarymoorStudios/Core
[all-posts]: /devlog.html
[devlog-post9]: /devlog/2025-11-26-FSM
[devlog-post11]: /devlog/2025-12-16-HSM
[feedback]: mailto:feedback@marymoorstudios.com
[glossary]: /devlog/Glossary
[nuget-fsm]: https://www.nuget.org/packages/MarymoorStudios.Core.Fsm/
