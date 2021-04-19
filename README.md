# AML-CS Uninorte | Web site
> ![amlcs-logo](content/images/logo.jpg)

## How to add a post

### Using [Hugo](https://github.com/gohugoio/hugo)
```bash
hugo new posts/new-post/index.md
```
### Manually
1. Go to `content/posts` folder
2. Duplicate the `example` post and rename it
3. Replace front face data: Title, Date, etc

### Publish it
- Make sure to have `draft: false`
- Make a new commit and push it to master

## Raw HTML support

You can embed raw html inside markdown files using the `rawhtml` shortcode. ie:
```markdown
{{< rawhtml >}}
<img class="image-right" src="images/image.jpg" alt="Alt content"/>
{{< /rawhtml >}}
```

## How to run in develop
```bash
hugo server -D
```