FROM ubuntu:18.04

RUN apt-get update \
  && apt-get install -y software-properties-common wget \
  && wget -qO - https://apt.llvm.org/llvm-snapshot.gpg.key | apt-key add - \
  && add-apt-repository "deb http://apt.llvm.org/bionic/ llvm-toolchain-bionic-7 main" \
  && apt-get update \
  && apt-get install --no-install-recommends -y \
       clang-7 \
       clang-tidy-7 \
       doxygen \
       libpq-dev \
       thrift-compiler \
       make \
       build-essential \
       curl \
       doxygen \
       gcc-multilib \
       git \
       python3-dev \
       python3-pip \
       python3-setuptools \
       python-virtualenv \
       libsasl2-dev \
       libldap2-dev \
       libssl-dev \
  && update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-7 100 \
  && update-alternatives --install /usr/bin/clang clang /usr/bin/clang-7 100 \
  && update-alternatives --install /usr/bin/clang-tidy clang-tidy /usr/bin/clang-tidy-7 100

COPY . /codechecker

WORKDIR "/codechecker"

RUN pip3 install wheel
RUN pip3 install -r analyzer/requirements_py/dev/requirements.txt

RUN make package

CMD ["python3", "remote/analyze_handler.py"]
