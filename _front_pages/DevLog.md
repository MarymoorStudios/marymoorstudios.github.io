---
order: 4
title: "DevLog"
bg: black
color: white
fa-icon: comments
---
# Recent Posts

<div>
<ul>
  {% assign sorted_devlog = site.devlog | sort: "order" | reverse | where: "featured", "true" | limit: 3 %}
  {% for post in sorted_devlog %}
    <li>
      {% if post.hideDate == "true" %}
        <a href="{{ post.url }}">{{ post.title }}</a>
      {% else %}        
        <a href="{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      {% endif %}        
      <br>{{ post.excerpt | strip }}
    </li>
  {% endfor %}
</ul>
</div>

<div style="text-align: center;">
  <a href="devlog.html">Read More</a>
</div>
